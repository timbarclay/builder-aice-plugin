/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/core';
import { Typography, Paper, Divider, Button } from '@material-ui/core';

interface PreviewProps {
  content?: {
    body: string
    questions: Array<{
      question: string
      answer: string
    }>
  }
  onCreateResource?: () => void
  isCreatingResource?: boolean
}

export default function Preview({ content, onCreateResource, isCreatingResource }: PreviewProps) {
  if (!content) {
    return <div>Preview</div>
  }

  return (
    <Paper css={{ padding: 24, height: '100%', overflow: 'auto' }}>
      <div css={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <Typography variant="h6">
          Generated Content
        </Typography>
        {onCreateResource && (
          <Button
            variant="contained"
            color="secondary"
            onClick={onCreateResource}
            disabled={isCreatingResource}
            size="small"
          >
            {isCreatingResource ? 'Creating...' : 'Create Structured Resource'}
          </Button>
        )}
      </div>
      
      <div css={{ marginBottom: 24 }}>
        <Typography variant="subtitle2" css={{ marginBottom: 8, fontWeight: 'bold' }}>
          Article:
        </Typography>
        <Typography variant="body2" css={{ whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
          {content.body}
        </Typography>
      </div>
      
      <Divider css={{ marginBottom: 16 }} />
      
      <Typography variant="subtitle2" css={{ marginBottom: 12, fontWeight: 'bold' }}>
        Comprehension Questions:
      </Typography>
      
      {content.questions.map((q, index) => (
        <div key={index} css={{ marginBottom: 12 }}>
          <Typography variant="body2" css={{ fontWeight: 500 }}>
            {index + 1}. {q.question}
          </Typography>
          <Typography variant="body2" color="textSecondary" css={{ marginLeft: 16 }}>
            Answer: {q.answer}
          </Typography>
        </div>
      ))}
    </Paper>
  )
}