import React from 'react';
import { jsx } from '@emotion/core';
import { Grid } from '@material-ui/core';
import GeneratorForm from './GeneratorForm';
import Preview from './Preview';

export default function GeneratorPane({ lessonData }: { lessonData: Map<string, any> }) {
  return (
    <Grid container css={{ height: '100%' }}>
      <Grid item xs={12} lg={6}>
        <GeneratorForm />
      </Grid>
      <Grid item xs={12} lg={6}>
        <Preview />
      </Grid>
    </Grid>
  )
}