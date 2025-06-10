(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react'), require('@emotion/core'), require('@builder.io/sdk'), require('@material-ui/core')) :
  typeof define === 'function' && define.amd ? define(['react', '@emotion/core', '@builder.io/sdk', '@material-ui/core'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.aiGenerator = factory(global.React, global.core$1, global.sdk, global.core));
})(this, (function (React, core$1, sdk, core) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

  function GeneratorForm() {
      return React__default["default"].createElement("div", null,
          React__default["default"].createElement("h1", null, "GeneratorForm"));
  }

  function Preview() {
      return React__default["default"].createElement("div", null, "Preview");
  }

  function GeneratorPane({ lessonData }) {
      return (React__default["default"].createElement(core.Grid, { container: true, css: { height: '100%' } },
          React__default["default"].createElement(core.Grid, { item: true, xs: 12, lg: 6 },
              React__default["default"].createElement(GeneratorForm, null)),
          React__default["default"].createElement(core.Grid, { item: true, xs: 12, lg: 6 },
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
          return core$1.jsx("div", { css: { padding: 16, height: '100vh' } },
              core$1.jsx(core.Typography, { variant: "h4", css: { marginBottom: 16 } }, "Sorry, AI Generator is currently only available for lessons"));
      }
      const lessonData = (_d = (_c = context.designerState) === null || _c === void 0 ? void 0 : _c.editingContentModel) === null || _d === void 0 ? void 0 : _d.data;
      if (!lessonData) {
          return core$1.jsx("div", { css: { padding: 16, height: '100vh' } },
              core$1.jsx(core.Typography, { variant: "h4", css: { marginBottom: 16 } }, "No lesson data found"));
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
      return (core$1.jsx("div", { css: { padding: 16, height: '100vh' } },
          core$1.jsx("div", { css: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 } },
              core$1.jsx(core.Typography, { variant: "h4" },
                  "Use AICE to generate lesson resources for ",
                  model),
              core$1.jsx(core.Button, { variant: "outlined", onClick: () => setModalOpen(true) }, "Set Credentials")),
          core$1.jsx(GeneratorPane, { lessonData: lessonData }),
          core$1.jsx(core.Dialog, { open: modalOpen, onClose: () => setModalOpen(false), maxWidth: "sm", fullWidth: true },
              core$1.jsx(core.DialogTitle, null, "Set AI Credentials"),
              core$1.jsx(core.DialogContent, { css: { paddingTop: 20 } },
                  core$1.jsx("div", { css: { marginBottom: 16 } },
                      core$1.jsx(core.TextField, { autoFocus: true, label: "Client ID", fullWidth: true, variant: "outlined", value: formData.clientId, onChange: (e) => setFormData(Object.assign(Object.assign({}, formData), { clientId: e.target.value })) })),
                  core$1.jsx("div", { css: { marginBottom: 16 } },
                      core$1.jsx(core.TextField, { label: "Client Secret", type: "password", fullWidth: true, variant: "outlined", value: formData.clientSecret, onChange: (e) => setFormData(Object.assign(Object.assign({}, formData), { clientSecret: e.target.value })) })),
                  core$1.jsx("div", { css: { marginBottom: 16 } },
                      core$1.jsx(core.TextField, { label: "AWS Access Key ID", fullWidth: true, variant: "outlined", value: formData.awsAccessKeyId, onChange: (e) => setFormData(Object.assign(Object.assign({}, formData), { awsAccessKeyId: e.target.value })) })),
                  core$1.jsx("div", { css: { marginBottom: 16 } },
                      core$1.jsx(core.TextField, { label: "AWS Secret Access Key", type: "password", fullWidth: true, variant: "outlined", value: formData.awsSecretAccessKey, onChange: (e) => setFormData(Object.assign(Object.assign({}, formData), { awsSecretAccessKey: e.target.value })) }))),
              core$1.jsx(core.DialogActions, null,
                  core$1.jsx(core.Button, { onClick: () => setModalOpen(false) }, "Cancel"),
                  core$1.jsx(core.Button, { onClick: handleSaveCredentials, color: "primary" }, "Save")))));
  }
  sdk.Builder.register('editor.mainTab', {
      name: '✨ AI Generator',
      component: AiGenerator,
  });

  return AiGenerator;

}));
//# sourceMappingURL=plugin-ai-generator.umd.js.map
