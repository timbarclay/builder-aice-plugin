/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/core';
import { Builder } from '@builder.io/sdk';
import { Typography, Button } from '@material-ui/core';

// Import the app context - will be available at runtime in Builder.io
import appContext from '@builder.io/app-context';
import { ApplicationContext } from './interfaces/application-context';
const context: ApplicationContext = appContext

console.log('appContext', appContext)

export default function AiGenerator() {
  console.log('appContext', appContext)

  const model = context.designerState?.editingContentModel?.data.get('name')
  const type = context.designerState?.editingModel?.name
  
  return <Stack direction="column" component="main" sx={[
    {
      justifyContent: 'center',
      height: 'calc((1 - var(--template-frame-height, 0)) * 100%)',
      marginTop: 'max(40px - var(--template-frame-height, 0px), 0px)',
      minHeight: '100%',
    }
  ]}>
    <Typography>
      AI Generator {type}: {model}
    </Typography>
  </Stack>
}

Builder.register('editor.mainTab', {
  name: '✨ AI Generator',
  component: AiGenerator,
});
