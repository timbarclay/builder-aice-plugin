/** @jsx jsx */
import React, { useState, useRef, useEffect } from 'react';
import { jsx } from '@emotion/core';
import { Grid, Typography, CircularProgress, Button } from '@material-ui/core';
import GeneratorForm from './GeneratorForm';
import Preview from './Preview';
import { AiceApi } from './api/aiceApi';
import { getS3Object } from './api/resultBucketApi';
import { ApplicationContext } from './interfaces/application-context';
import { TextBlock, Page } from './interfaces/structuredResource';
import { VisualResource } from './interfaces/visualResource';

interface GeneratorPaneProps {
  lessonData: Map<string, any>
  clientId: string | null
  clientSecret: string | null
  awsAccessKeyId: string | null
  awsSecretAccessKey: string | null
  context: ApplicationContext
}

export interface EngineParameters {
  title: string
  learningObjective: string
  learningGoal: string
  targetWordCount: number
  vocabularyWords: string[]
}

interface GeneratedContent {
  body: string
  questions: Array<{
    question: string
    answer: string
  }>
}

export default function GeneratorPane({ lessonData, clientId, clientSecret, awsAccessKeyId, awsSecretAccessKey, context }: GeneratorPaneProps) {
  const userId = context.user.id
  const contentId = context.designerState?.editingContentModel?.id
  const userContentId = `${userId}-${contentId}`
  const settings = context.user.organization.value.settings.plugins;
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStatus, setGenerationStatus] = useState<string>('');
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentGenerationId, setCurrentGenerationId] = useState<string | null>(null);
  const [isCreatingResource, setIsCreatingResource] = useState(false);
  const [isCreatingVisualResource, setIsCreatingVisualResource] = useState(false);
  const [title, setTitle] = useState<string>('');
  const [createdResourceId, setCreatedResourceId] = useState<string | null>(null);
  const [createdVisualResourceId, setCreatedVisualResourceId] = useState<string | null>(null);
  
  const pollingIntervalRef = useRef<number | null>(null);
  const apiRef = useRef<AiceApi | null>(null);

  const startPolling = (api: AiceApi, generationId: string) => {
    setCurrentGenerationId(generationId);
    
    const pollStatus = async () => {
      try {
        const status = await api.generationStatus(generationId);
        setGenerationStatus(`Status: ${status.generation_status}`);
        
        if (status.generation_status === 'COMPLETED') {
          if (pollingIntervalRef.current) {
            clearInterval(pollingIntervalRef.current);
            pollingIntervalRef.current = null;
          }
          
          // Get generated content from S3
          setGenerationStatus('Retrieving generated content...');
          const result = await getS3Object(awsAccessKeyId!, awsSecretAccessKey!, status.output_location!);
          const content = JSON.parse(result.article_text);
          
          setGeneratedContent(content);
          setGenerationStatus('Generation completed successfully!');
          setIsGenerating(false);
          setCurrentGenerationId(null);
          
        } else if (status.generation_status === 'FAILED') {
          if (pollingIntervalRef.current) {
            clearInterval(pollingIntervalRef.current);
            pollingIntervalRef.current = null;
          }
          throw new Error('Generation failed');
        }
      } catch (err) {
        if (pollingIntervalRef.current) {
          clearInterval(pollingIntervalRef.current);
          pollingIntervalRef.current = null;
        }
        const errorMessage = err instanceof Error ? err.message : 'Status check failed';
        setError(errorMessage);
        setGenerationStatus('');
        setIsGenerating(false);
        setCurrentGenerationId(null);
      }
    };

    // Start polling immediately, then every 10 seconds
    pollStatus();
    pollingIntervalRef.current = window.setInterval(pollStatus, 10000);
  };

  const stopGeneration = () => {
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
      pollingIntervalRef.current = null;
    }
    setIsGenerating(false);
    setGenerationStatus('Generation cancelled');
    setCurrentGenerationId(null);
  };

  // Initialize from stored state and start polling if needed
  useEffect(() => {
    const storedGenerationId = settings.get(userContentId);
    if (storedGenerationId && clientId && clientSecret && awsAccessKeyId && awsSecretAccessKey) {
      setCurrentGenerationId(storedGenerationId);
      setIsGenerating(true);
      setGenerationStatus('Retrieving previous generation...');
      
      const api = new AiceApi(clientId, clientSecret);
      apiRef.current = api;
      startPolling(api, storedGenerationId);
    }
  }, [userContentId, clientId, clientSecret, awsAccessKeyId, awsSecretAccessKey]);

  // Cleanup polling on unmount
  useEffect(() => {
    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, []);

  // Persist currentGenerationId changes
  useEffect(() => {
    if (currentGenerationId) {
      settings.set(userContentId, currentGenerationId);
      context.user.organization.save();
    }
  }, [currentGenerationId, userContentId]);

  const createStructuredResource = async () => {
    if (!generatedContent) return;

    setIsCreatingResource(true);
    try {
      // Split content by paragraphs and group into pages with 2 paragraphs each
      const paragraphs = generatedContent.body
        .split('\n\n')
        .filter(p => p.trim())
        .map(p => `<p>${p}</p>`);
      const pages: Page[] = [];
      
      for (let i = 0; i < paragraphs.length; i += 2) {
        const textContent = paragraphs.slice(i, i + 2).join('');
        const textBlock: TextBlock = {
          type: 'Text',
          text: textContent
        };
        pages.push({
          blocks: [textBlock]
        });
      }

      const articleName = `${title || 'Article'} - AI generated by ${context.user.data.displayName}`;
      const slug = articleName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      
      const createResult = await context.createContent('resource-structured', {
        name: articleName,
        data: {
          name: articleName,
          slug: slug,
          pages: pages,
          generatedByAi: true
        }
      });

      console.log('Structured resource created:', createResult);
      
      // Store the created resource ID
      if (createResult.id) {
        setCreatedResourceId(createResult.id);
      }
      
      // Show success message
      alert(`Structured resource "${articleName}" created successfully!`);
      
    } catch (err) {
      console.error('Error creating structured resource:', err);
      alert(`Error creating structured resource: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setIsCreatingResource(false);
    }
  };

  const createVisualResource = async () => {
    if (!generatedContent) return;

    setIsCreatingVisualResource(true);
    try {
      // Split content into paragraphs and group them into pages (2 paragraphs per page)
      const paragraphs = generatedContent.body.split('\n\n').filter(p => p.trim());
      const pageList = [];
      
      for (let i = 0; i < paragraphs.length; i += 2) {
        // Combine 2 paragraphs for each page, wrap each in <p> tags
        const pageText = paragraphs.slice(i, i + 2).map(p => `<p>${p}</p>`).join('');
        
        const page = {
          blocks: [
            {
              '@type': '@builder.io/sdk:Element' as const,
              component: {
                name: 'Text',
                options: {
                  text: pageText
                }
              }
            }
          ]
        };
        
        pageList.push(page);
      }

      // Create the ResourcePages component
      const resourcePagesBlock = {
        '@type': '@builder.io/sdk:Element' as const,
        component: {
          name: 'ResourcePages',
          options: {
            pageList: pageList
          }
        }
      };

      const articleName = `${title || 'Article'} - AI visual resource by ${context.user.data?.displayName || 'User'}`;
      const slug = articleName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      
      const createResult = await context.createContent('resource', {
        name: articleName,
        data: {
          title: articleName,
          slug: slug,
          blocks: [resourcePagesBlock],
          generatedByAi: true
        }
      });

      console.log('Visual resource created:', createResult);
      
      // Store the created visual resource ID
      if (createResult.id) {
        setCreatedVisualResourceId(createResult.id);
      }
      
      // Show success message
      alert(`Visual resource "${articleName}" created successfully!`);
      
    } catch (err) {
      console.error('Error creating visual resource:', err);
      alert(`Error creating visual resource: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setIsCreatingVisualResource(false);
    }
  };

  const onGenerate = async (parameters: EngineParameters) => {
    if (!clientId || !clientSecret || !awsAccessKeyId || !awsSecretAccessKey) {
      setError('Missing credentials');
      return;
    }

    setIsGenerating(true);
    setError(null);
    setGeneratedContent(null);
    setGenerationStatus('Starting generation...');
    setTitle(parameters.title);
    setCreatedResourceId(null); // Reset created resource ID for new generation
    setCreatedVisualResourceId(null); // Reset created visual resource ID for new generation

    try {
      const api = new AiceApi(clientId, clientSecret);
      apiRef.current = api;
      
      // Start generation
      setGenerationStatus('Submitting generation request...');
      const response = await api.generateArticle(
        parameters.title,
        parameters.learningObjective,
        parameters.learningGoal,
        parameters.targetWordCount,
        parameters.vocabularyWords
      );

      // Start polling for completion
      setGenerationStatus('Generation in progress...');
      startPolling(api, response.generation_id);
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Generation failed';
      setError(errorMessage);
      setGenerationStatus('');
      setIsGenerating(false);
    }
  };

  return (
    <Grid container css={{ height: '100%' }}>
      <Grid item xs={12} lg={6}>
        <GeneratorForm 
          lessonData={lessonData} 
          disabled={!clientId || !clientSecret || !awsAccessKeyId || !awsSecretAccessKey || isGenerating} 
          onGenerate={onGenerate} 
        />
      </Grid>
      <Grid item xs={12} lg={6}>
        <div css={{ padding: 24, height: '100%' }}>
          {isGenerating && (
            <div css={{ textAlign: 'center', padding: 20 }}>
              <CircularProgress css={{ marginBottom: 16 }} />
              <Typography variant="body2" color="textSecondary" css={{ marginBottom: 16 }}>
                {generationStatus}
              </Typography>
              <Button variant="outlined" onClick={stopGeneration} size="small">
                Cancel Generation
              </Button>
            </div>
          )}
          
          {error && (
            <div css={{ padding: 20, backgroundColor: '#ffebee', borderRadius: 4 }}>
              <Typography variant="body2" color="error">
                Error: {error}
              </Typography>
            </div>
          )}
          
          {generatedContent && !isGenerating && (
            <Preview 
              content={generatedContent} 
              onCreateResource={createStructuredResource}
              onCreateVisualResource={createVisualResource}
              isCreatingResource={isCreatingResource}
              isCreatingVisualResource={isCreatingVisualResource}
              createdResourceId={createdResourceId}
              createdVisualResourceId={createdVisualResourceId}
            />
          )}
          
          {!isGenerating && !generatedContent && !error && (
            <div css={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              height: '100%',
              color: '#666',
              textAlign: 'center'
            }}>
              <Typography variant="body2">
                Fill out the form and click "Generate Content" to create your lesson
              </Typography>
            </div>
          )}
        </div>
      </Grid>
    </Grid>
  )
}