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
  
  return <Typography>
      AI Generator {type}: {model}
    </Typography>
}

Builder.register('editor.mainTab', {
  name: '✨ AI Generator',
  component: AiGenerator,
});
