(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react'), require('@emotion/core'), require('@builder.io/sdk'), require('@material-ui/core'), require('mobx')) :
  typeof define === 'function' && define.amd ? define(['react', '@emotion/core', '@builder.io/sdk', '@material-ui/core', 'mobx'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.aiGenerator = factory(global.React, global.core, global.sdk, global.core$1, global.mobx));
})(this, (function (React, core, sdk, core$1, mobx) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

  /** @jsx jsx */
  function GeneratorForm({ lessonData, disabled, onGenerate }) {
      var _a, _b, _c;
      const [title, setTitle] = React.useState(lessonData.get('name') || '');
      const [learningObjective, setLearningObjective] = React.useState(((_a = lessonData.get('skill')) === null || _a === void 0 ? void 0 : _a.value.data.learningObjective) || '');
      const [learningGoal, setLearningGoal] = React.useState(((_b = lessonData.get('skill')) === null || _b === void 0 ? void 0 : _b.value.data.learningGoal) || '');
      const [targetWordCount, setTargetWordCount] = React.useState(300);
      const [vocabularyWords, setVocabularyWords] = React.useState(((_c = mobx.toJS(lessonData.get('vocabularyWords'))) === null || _c === void 0 ? void 0 : _c.map((w) => { var _a; return (_a = w === null || w === void 0 ? void 0 : w.word) === null || _a === void 0 ? void 0 : _a.Default; }).join(', ')) || '');
      const handleGenerate = () => {
          onGenerate({
              title,
              learningObjective,
              learningGoal,
              targetWordCount,
              vocabularyWords: vocabularyWords.split(',').map((w) => w.trim()).filter((w) => w),
          });
      };
      return (core.jsx(core$1.Paper, { css: { padding: 24, height: '100%' } },
          core.jsx(core$1.Typography, { variant: "h6", css: { marginBottom: 16 } }, "Content Generation Settings"),
          core.jsx("div", { css: { marginBottom: 16 } },
              core.jsx(core$1.TextField, { label: "Title", fullWidth: true, variant: "outlined", value: title, onChange: (e) => setTitle(e.target.value) })),
          core.jsx("div", { css: { marginBottom: 16 } },
              core.jsx(core$1.TextField, { label: "Learning Objective", fullWidth: true, multiline: true, rows: 2, variant: "outlined", value: learningObjective, onChange: (e) => setLearningObjective(e.target.value) })),
          core.jsx("div", { css: { marginBottom: 16 } },
              core.jsx(core$1.TextField, { label: "Learning Goal", fullWidth: true, multiline: true, rows: 2, variant: "outlined", value: learningGoal, onChange: (e) => setLearningGoal(e.target.value) })),
          core.jsx("div", { css: { marginBottom: 16 } },
              core.jsx(core$1.TextField, { label: "Target Word Count", fullWidth: true, type: "number", variant: "outlined", value: targetWordCount, onChange: (e) => setTargetWordCount(parseInt(e.target.value) || 300) })),
          core.jsx("div", { css: { marginBottom: 24 } },
              core.jsx(core$1.TextField, { label: "Vocabulary Words", fullWidth: true, multiline: true, rows: 3, variant: "outlined", placeholder: "Enter words separated by commas", value: vocabularyWords, onChange: (e) => setVocabularyWords(e.target.value), helperText: "Separate multiple words with commas" })),
          core.jsx(core$1.Button, { variant: "contained", color: "primary", fullWidth: true, size: "large", onClick: handleGenerate, disabled: disabled }, "Generate Content")));
  }

  function Preview() {
      return React__default["default"].createElement("div", null, "Preview");
  }

  function GeneratorPane({ lessonData, clientId, clientSecret, awsAccessKeyId, awsSecretAccessKey }) {
      function onGenerate(parameters) {
          console.log('onGenerate', parameters);
      }
      return (React__default["default"].createElement(core$1.Grid, { container: true, css: { height: '100%' } },
          React__default["default"].createElement(core$1.Grid, { item: true, xs: 12, lg: 6 },
              React__default["default"].createElement(GeneratorForm, { lessonData: lessonData, disabled: !clientId || !clientSecret || !awsAccessKeyId || !awsSecretAccessKey, onGenerate: onGenerate })),
          React__default["default"].createElement(core$1.Grid, { item: true, xs: 12, lg: 6 },
              React__default["default"].createElement(Preview, null))));
  }

  /** @jsx jsx */
  function AiGenerator({ context }) {
      var _a, _b, _c, _d;
      console.log('context', context);
      const organisation = context.user.organization;
      const settings = organisation.value.settings.plugins;
      const [clientId, setClientId] = React.useState(settings.get('aiClientId'));
      const [clientSecret, setClientSecret] = React.useState(settings.get('aiClientSecret'));
      const [awsAccessKeyId, setAwsAccessKeyId] = React.useState(settings.get('aiAwsAccessKeyId'));
      const [awsSecretAccessKey, setAwsSecretAccessKey] = React.useState(settings.get('aiAwsSecretAccessKey'));
      const [modalOpen, setModalOpen] = React.useState(false);
      const [formData, setFormData] = React.useState({
          clientId: clientId || '',
          clientSecret: clientSecret || '',
          awsAccessKeyId: awsAccessKeyId || '',
          awsSecretAccessKey: awsSecretAccessKey || ''
      });
      //const organisation = context.user.organization;
      const type = (_b = (_a = context.designerState) === null || _a === void 0 ? void 0 : _a.editingModel) === null || _b === void 0 ? void 0 : _b.name;
      if (type !== 'lesson') {
          return core.jsx("div", { css: { padding: 16, height: '100vh' } },
              core.jsx(core$1.Typography, { variant: "h4", css: { marginBottom: 16 } }, "Sorry, AI Generator is currently only available for lessons"));
      }
      const lessonData = (_d = (_c = context.designerState) === null || _c === void 0 ? void 0 : _c.editingContentModel) === null || _d === void 0 ? void 0 : _d.data;
      if (!lessonData) {
          return core.jsx("div", { css: { padding: 16, height: '100vh' } },
              core.jsx(core$1.Typography, { variant: "h4", css: { marginBottom: 16 } }, "No lesson data found"));
      }
      const requiresCredentials = !(clientId && clientSecret && awsAccessKeyId && awsSecretAccessKey);
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
      return (core.jsx("div", { css: { padding: 16, height: '100vh' } },
          core.jsx("div", { css: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 } },
              core.jsx(core$1.Typography, { variant: "h4" },
                  "Use AICE to generate lesson resources for ",
                  model),
              core.jsx(core$1.Button, { variant: "outlined", onClick: () => setModalOpen(true) }, "Set Credentials")),
          !requiresCredentials && core.jsx(GeneratorPane, { lessonData: lessonData, clientId: clientId, clientSecret: clientSecret, awsAccessKeyId: awsAccessKeyId, awsSecretAccessKey: awsSecretAccessKey }),
          core.jsx(core$1.Dialog, { open: modalOpen, onClose: () => setModalOpen(false), maxWidth: "sm", fullWidth: true },
              core.jsx(core$1.DialogTitle, null, "Set AI Credentials"),
              core.jsx(core$1.DialogContent, { css: { paddingTop: 20 } },
                  core.jsx("div", { css: { marginBottom: 16 } },
                      core.jsx(core$1.TextField, { autoFocus: true, label: "Client ID", fullWidth: true, variant: "outlined", value: formData.clientId, onChange: (e) => setFormData(Object.assign(Object.assign({}, formData), { clientId: e.target.value })) })),
                  core.jsx("div", { css: { marginBottom: 16 } },
                      core.jsx(core$1.TextField, { label: "Client Secret", type: "password", fullWidth: true, variant: "outlined", value: formData.clientSecret, onChange: (e) => setFormData(Object.assign(Object.assign({}, formData), { clientSecret: e.target.value })) })),
                  core.jsx("div", { css: { marginBottom: 16 } },
                      core.jsx(core$1.TextField, { label: "AWS Access Key ID", fullWidth: true, variant: "outlined", value: formData.awsAccessKeyId, onChange: (e) => setFormData(Object.assign(Object.assign({}, formData), { awsAccessKeyId: e.target.value })) })),
                  core.jsx("div", { css: { marginBottom: 16 } },
                      core.jsx(core$1.TextField, { label: "AWS Secret Access Key", type: "password", fullWidth: true, variant: "outlined", value: formData.awsSecretAccessKey, onChange: (e) => setFormData(Object.assign(Object.assign({}, formData), { awsSecretAccessKey: e.target.value })) }))),
              core.jsx(core$1.DialogActions, null,
                  core.jsx(core$1.Button, { onClick: () => setModalOpen(false) }, "Cancel"),
                  core.jsx(core$1.Button, { onClick: handleSaveCredentials, color: "primary" }, "Save")))));
  }
  sdk.Builder.register('editor.mainTab', {
      name: '✨ AI Generator',
      component: AiGenerator,
  });

  return AiGenerator;

}));
//# sourceMappingURL=plugin-ai-generator.umd.js.map
