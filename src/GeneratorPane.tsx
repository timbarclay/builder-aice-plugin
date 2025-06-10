/** @jsx jsx */
import React, { useState, useRef, useEffect } from 'react';
import { jsx } from '@emotion/core';
import { Grid, Typography, CircularProgress, Button } from '@material-ui/core';
import GeneratorForm from './GeneratorForm';
import Preview from './Preview';
import { AiceApi } from './api/aiceApi';
import { getS3Object } from './api/resultBucketApi';

interface GeneratorPaneProps {
  lessonData: Map<string, any>
  clientId: string | null
  clientSecret: string | null
  awsAccessKeyId: string | null
  awsSecretAccessKey: string | null
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

export default function GeneratorPane({ lessonData, clientId, clientSecret, awsAccessKeyId, awsSecretAccessKey }: GeneratorPaneProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStatus, setGenerationStatus] = useState<string>('');
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentGenerationId, setCurrentGenerationId] = useState<string | null>(null);
  
  const pollingIntervalRef = useRef<number | null>(null);
  const apiRef = useRef<AiceApi | null>(null);

  // Cleanup polling on unmount
  useEffect(() => {
    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, []);

  const stopGeneration = () => {
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
      pollingIntervalRef.current = null;
    }
    setIsGenerating(false);
    setGenerationStatus('Generation cancelled');
    setCurrentGenerationId(null);
  };

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

  const onGenerate = async (parameters: EngineParameters) => {
    if (!clientId || !clientSecret || !awsAccessKeyId || !awsSecretAccessKey) {
      setError('Missing credentials');
      return;
    }

    setIsGenerating(true);
    setError(null);
    setGeneratedContent(null);
    setGenerationStatus('Starting generation...');

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
            <Preview content={generatedContent} />
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