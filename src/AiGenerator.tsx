/** @jsx jsx */
import React, { useState } from 'react';
import { jsx } from '@emotion/core';
import { Builder } from '@builder.io/sdk';
import { Grid, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@material-ui/core';
import GeneratorPane from './GeneratorPane';
import { ApplicationContext } from './interfaces/application-context';


export default function AiGenerator({context}: {context: ApplicationContext}) {
  console.log('context', context)
  const organisation = context.user.organization
  const settings = organisation.value.settings.plugins

  const [clientId, setClientId] = useState<string | null>(settings.get('aiClientId'));
  const [clientSecret, setClientSecret] = useState<string | null>(settings.get('aiClientSecret'));
  const [awsAccessKeyId, setAwsAccessKeyId] = useState<string | null>(settings.get('aiAwsAccessKeyId'));
  const [awsSecretAccessKey, setAwsSecretAccessKey] = useState<string | null>(settings.get('aiAwsSecretAccessKey'));
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    clientId: clientId || '',
    clientSecret: clientSecret || '',
    awsAccessKeyId: awsAccessKeyId || '',
    awsSecretAccessKey: awsSecretAccessKey || ''
  });

  
  
  //const organisation = context.user.organization;
  const type = context.designerState?.editingModel?.name

  if (type !== 'lesson') {
    return <div css={{ padding: 16, height: '100vh' }}>
      <Typography variant="h4" css={{ marginBottom: 16 }}>
        Sorry, AI Generator is currently only available for lessons
      </Typography>
    </div>
  }

  const lessonData = context.designerState?.editingContentModel?.data;
  if (!lessonData) {
    return <div css={{ padding: 16, height: '100vh' }}>
      <Typography variant="h4" css={{ marginBottom: 16 }}>
        No lesson data found
      </Typography>
    </div>
  }

  const requiresCredentials = !(clientId && clientSecret && awsAccessKeyId && awsSecretAccessKey)

  const handleSaveCredentials = () => {
    setClientId(formData.clientId);
    setClientSecret(formData.clientSecret);
    setAwsAccessKeyId(formData.awsAccessKeyId);
    setAwsSecretAccessKey(formData.awsSecretAccessKey);
    
    settings.set('aiClientId', formData.clientId);
    settings.set('aiClientSecret', formData.clientSecret);
    settings.set('aiAwsAccessKeyId', formData.awsAccessKeyId);
    settings.set('aiAwsSecretAccessKey', formData.awsSecretAccessKey);
    organisation.save()
    
    setModalOpen(false);
  };

  const model = lessonData.get('name')
  
  return (
    <div css={{ padding: 16, height: '100vh' }}>
      <div css={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <Typography variant="h4">
          Use AICE to generate lesson resources for {model}
        </Typography>
        <Button variant="outlined" onClick={() => setModalOpen(true)}>
          Set Credentials
        </Button>
      </div>
      {!requiresCredentials && <GeneratorPane lessonData={lessonData} clientId={clientId} clientSecret={clientSecret} awsAccessKeyId={awsAccessKeyId} awsSecretAccessKey={awsSecretAccessKey} />}
      
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Set AI Credentials</DialogTitle>
        <DialogContent css={{ paddingTop: 20 }}>
          <div css={{ marginBottom: 16 }}>
            <TextField
              autoFocus
              label="Client ID"
              fullWidth
              variant="outlined"
              value={formData.clientId}
              onChange={(e) => setFormData({...formData, clientId: e.target.value})}
            />
          </div>
          <div css={{ marginBottom: 16 }}>
            <TextField
              label="Client Secret"
              type="password"
              fullWidth
              variant="outlined"
              value={formData.clientSecret}
              onChange={(e) => setFormData({...formData, clientSecret: e.target.value})}
            />
          </div>
          <div css={{ marginBottom: 16 }}>
            <TextField
              label="AWS Access Key ID"
              fullWidth
              variant="outlined"
              value={formData.awsAccessKeyId}
              onChange={(e) => setFormData({...formData, awsAccessKeyId: e.target.value})}
            />
          </div>
          <div css={{ marginBottom: 16 }}>
            <TextField
              label="AWS Secret Access Key"
              type="password"
              fullWidth
              variant="outlined"
              value={formData.awsSecretAccessKey}
              onChange={(e) => setFormData({...formData, awsSecretAccessKey: e.target.value})}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalOpen(false)}>Cancel</Button>
          <Button onClick={handleSaveCredentials} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

Builder.register('editor.mainTab', {
  name: '✨ AI Generator',
  component: AiGenerator,
});
