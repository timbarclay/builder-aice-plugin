import React from 'react';
import { jsx } from '@emotion/core';
import { Grid } from '@material-ui/core';
import GeneratorForm from './GeneratorForm';
import Preview from './Preview';

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

export default function GeneratorPane({ lessonData, clientId, clientSecret, awsAccessKeyId, awsSecretAccessKey }: GeneratorPaneProps) {
  function onGenerate(parameters: EngineParameters) {
    console.log('onGenerate', parameters)
  }

  return (
    <Grid container css={{ height: '100%' }}>
      <Grid item xs={12} lg={6}>
        <GeneratorForm lessonData={lessonData} disabled={!clientId || !clientSecret || !awsAccessKeyId || !awsSecretAccessKey} onGenerate={onGenerate} />
      </Grid>
      <Grid item xs={12} lg={6}>
        <Preview />
      </Grid>
    </Grid>
  )
}