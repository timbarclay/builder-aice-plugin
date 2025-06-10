/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/core';
import { Builder } from '@builder.io/sdk';
import { Typography, Button } from '@material-ui/core';

export default function AiGenerator() {
  return <div>
    <Typography>
      AI Generator
    </Typography>
  </div>
}

Builder.register('editor.mainTab', {
  name: '✨ AI Generator',
  component: () => <div>Hello</div>,
});
