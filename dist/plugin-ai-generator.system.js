System.register(['react', '@emotion/core', '@builder.io/sdk', '@material-ui/core'], (function (exports) {
  'use strict';
  var React, useState, jsx, Builder, Grid, Typography, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions;
  return {
    setters: [function (module) {
      React = module["default"];
      useState = module.useState;
    }, function (module) {
      jsx = module.jsx;
    }, function (module) {
      Builder = module.Builder;
    }, function (module) {
      Grid = module.Grid;
      Typography = module.Typography;
      Button = module.Button;
      Dialog = module.Dialog;
      DialogTitle = module.DialogTitle;
      DialogContent = module.DialogContent;
      TextField = module.TextField;
      DialogActions = module.DialogActions;
    }],
    execute: (function () {

      exports('default', AiGenerator);

      function GeneratorForm() {
          return React.createElement("div", null,
              React.createElement("h1", null, "GeneratorForm"));
      }

      function Preview() {
          return React.createElement("div", null, "Preview");
      }

      function GeneratorPane({ lessonData }) {
          return (React.createElement(Grid, { container: true, css: { height: '100%' } },
              React.createElement(Grid, { item: true, xs: 12, lg: 6 },
                  React.createElement(GeneratorForm, null)),
              React.createElement(Grid, { item: true, xs: 12, lg: 6 },
                  React.createElement(Preview, null))));
      }

      /** @jsx jsx */
      function AiGenerator({ context }) {
          var _a, _b, _c, _d;
          console.log('context', context);
          const organisation = context.user.organization;
          const settings = organisation.value.settings.plugins;
          const [clientId, setClientId] = useState(settings.get('aiClientId'));
          const [clientSecret, setClientSecret] = useState(settings.get('aiClientSecret'));
          const [awsAccessKeyId, setAwsAccessKeyId] = useState(settings.get('aiAwsAccessKeyId'));
          const [awsSecretAccessKey, setAwsSecretAccessKey] = useState(settings.get('aiAwsSecretAccessKey'));
          const [modalOpen, setModalOpen] = useState(false);
          const [formData, setFormData] = useState({
              clientId: clientId || '',
              clientSecret: clientSecret || '',
              awsAccessKeyId: awsAccessKeyId || '',
              awsSecretAccessKey: awsSecretAccessKey || ''
          });
          //const organisation = context.user.organization;
          const type = (_b = (_a = context.designerState) === null || _a === void 0 ? void 0 : _a.editingModel) === null || _b === void 0 ? void 0 : _b.name;
          if (type !== 'lesson') {
              return jsx("div", { css: { padding: 16, height: '100vh' } },
                  jsx(Typography, { variant: "h4", css: { marginBottom: 16 } }, "Sorry, AI Generator is currently only available for lessons"));
          }
          const lessonData = (_d = (_c = context.designerState) === null || _c === void 0 ? void 0 : _c.editingContentModel) === null || _d === void 0 ? void 0 : _d.data;
          if (!lessonData) {
              return jsx("div", { css: { padding: 16, height: '100vh' } },
                  jsx(Typography, { variant: "h4", css: { marginBottom: 16 } }, "No lesson data found"));
          }
          const handleSaveCredentials = () => {
              setClientId(formData.clientId);
              setClientSecret(formData.clientSecret);
              setAwsAccessKeyId(formData.awsAccessKeyId);
              setAwsSecretAccessKey(formData.awsSecretAccessKey);
              settings.set('aiClientId', formData.clientId);
              settings.set('aiClientSecret', formData.clientSecret);
              settings.set('aiAwsAccessKeyId', formData.awsAccessKeyId);
              settings.set('aiAwsSecretAccessKey', formData.awsSecretAccessKey);
              organisation.save();
              setModalOpen(false);
          };
          const model = lessonData.get('name');
          return (jsx("div", { css: { padding: 16, height: '100vh' } },
              jsx("div", { css: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 } },
                  jsx(Typography, { variant: "h4" },
                      "Use AICE to generate lesson resources for ",
                      model),
                  jsx(Button, { variant: "outlined", onClick: () => setModalOpen(true) }, "Set Credentials")),
              jsx(GeneratorPane, { lessonData: lessonData }),
              jsx(Dialog, { open: modalOpen, onClose: () => setModalOpen(false), maxWidth: "sm", fullWidth: true },
                  jsx(DialogTitle, null, "Set AI Credentials"),
                  jsx(DialogContent, { css: { paddingTop: 20 } },
                      jsx("div", { css: { marginBottom: 16 } },
                          jsx(TextField, { autoFocus: true, label: "Client ID", fullWidth: true, variant: "outlined", value: formData.clientId, onChange: (e) => setFormData(Object.assign(Object.assign({}, formData), { clientId: e.target.value })) })),
                      jsx("div", { css: { marginBottom: 16 } },
                          jsx(TextField, { label: "Client Secret", type: "password", fullWidth: true, variant: "outlined", value: formData.clientSecret, onChange: (e) => setFormData(Object.assign(Object.assign({}, formData), { clientSecret: e.target.value })) })),
                      jsx("div", { css: { marginBottom: 16 } },
                          jsx(TextField, { label: "AWS Access Key ID", fullWidth: true, variant: "outlined", value: formData.awsAccessKeyId, onChange: (e) => setFormData(Object.assign(Object.assign({}, formData), { awsAccessKeyId: e.target.value })) })),
                      jsx("div", { css: { marginBottom: 16 } },
                          jsx(TextField, { label: "AWS Secret Access Key", type: "password", fullWidth: true, variant: "outlined", value: formData.awsSecretAccessKey, onChange: (e) => setFormData(Object.assign(Object.assign({}, formData), { awsSecretAccessKey: e.target.value })) }))),
                  jsx(DialogActions, null,
                      jsx(Button, { onClick: () => setModalOpen(false) }, "Cancel"),
                      jsx(Button, { onClick: handleSaveCredentials, color: "primary" }, "Save")))));
      }
      Builder.register('editor.mainTab', {
          name: '✨ AI Generator',
          component: AiGenerator,
      });

    })
  };
}));
//# sourceMappingURL=plugin-ai-generator.system.js.map
