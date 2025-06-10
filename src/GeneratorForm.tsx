/** @jsx jsx */
import React, { useState } from 'react';
import { jsx } from '@emotion/core';
import { TextField, Typography, Paper, Button } from '@material-ui/core';
import { toJS } from 'mobx';
import { EngineParameters } from './GeneratorPane';

interface GeneratorFormProps {
  lessonData: Map<string, any>;
  disabled: boolean;
  onGenerate: (parameters: EngineParameters) => void;
}

export default function GeneratorForm({ lessonData, disabled, onGenerate }: GeneratorFormProps) {
  const [title, setTitle] = useState(lessonData.get('name') || '');
  const [learningObjective, setLearningObjective] = useState(lessonData.get('skill')?.value.data.learningObjective || '');
  const [learningGoal, setLearningGoal] = useState(lessonData.get('skill')?.value.data.learningGoal || '');
  const [targetWordCount, setTargetWordCount] = useState(300);
  const [vocabularyWords, setVocabularyWords] = useState(
    toJS(lessonData.get('vocabularyWords'))?.map((w: any) => w?.word?.Default).join(', ') || ''
  );

  const handleGenerate = () => {
    onGenerate({
      title,
      learningObjective,
      learningGoal,
      targetWordCount,
      vocabularyWords: vocabularyWords.split(',').map((w: string) => w.trim()).filter((w: string) => w),
    })
  };

  return (
    <Paper css={{ padding: 24, height: '100%' }}>
      <Typography variant="h6" css={{ marginBottom: 16 }}>
        Content Generation Settings
      </Typography>
      
      <div css={{ marginBottom: 16 }}>
        <TextField
          label="Title"
          fullWidth
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      
      <div css={{ marginBottom: 16 }}>
        <TextField
          label="Learning Objective"
          fullWidth
          multiline
          rows={2}
          variant="outlined"
          value={learningObjective}
          onChange={(e) => setLearningObjective(e.target.value)}
        />
      </div>
      
      <div css={{ marginBottom: 16 }}>
        <TextField
          label="Learning Goal"
          fullWidth
          multiline
          rows={2}
          variant="outlined"
          value={learningGoal}
          onChange={(e) => setLearningGoal(e.target.value)}
        />
      </div>
      
      <div css={{ marginBottom: 16 }}>
        <TextField
          label="Target Word Count"
          fullWidth
          type="number"
          variant="outlined"
          value={targetWordCount}
          onChange={(e) => setTargetWordCount(parseInt(e.target.value) || 300)}
        />
      </div>
      
      <div css={{ marginBottom: 24 }}>
        <TextField
          label="Vocabulary Words"
          fullWidth
          multiline
          rows={3}
          variant="outlined"
          placeholder="Enter words separated by commas"
          value={vocabularyWords}
          onChange={(e) => setVocabularyWords(e.target.value)}
          helperText="Separate multiple words with commas"
        />
      </div>
      
      <Button
        variant="contained"
        color="primary"
        fullWidth
        size="large"
        onClick={handleGenerate}
        disabled={disabled}
      >
        Generate Content
      </Button>
    </Paper>
  );
}