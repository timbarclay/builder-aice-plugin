"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/** @jsx jsx */
const react_1 = require("react");
const core_1 = require("@emotion/core");
const sdk_1 = require("@builder.io/sdk");
const core_2 = require("@material-ui/core");
const GeneratorPane_1 = __importDefault(require("./GeneratorPane"));
function AiGenerator({ context }) {
    var _a, _b, _c, _d;
    console.log('context', context);
    const organisation = context.user.organization;
    const settings = organisation.value.settings.plugins;
    const [clientId, setClientId] = (0, react_1.useState)(settings.get('aiClientId'));
    const [clientSecret, setClientSecret] = (0, react_1.useState)(settings.get('aiClientSecret'));
    const [awsAccessKeyId, setAwsAccessKeyId] = (0, react_1.useState)(settings.get('aiAwsAccessKeyId'));
    const [awsSecretAccessKey, setAwsSecretAccessKey] = (0, react_1.useState)(settings.get('aiAwsSecretAccessKey'));
    const [modalOpen, setModalOpen] = (0, react_1.useState)(false);
    const [formData, setFormData] = (0, react_1.useState)({
        clientId: clientId || '',
        clientSecret: clientSecret || '',
        awsAccessKeyId: awsAccessKeyId || '',
        awsSecretAccessKey: awsSecretAccessKey || ''
    });
    const type = (_b = (_a = context.designerState) === null || _a === void 0 ? void 0 : _a.editingModel) === null || _b === void 0 ? void 0 : _b.name;
    if (type !== 'lesson') {
        return (0, core_1.jsx)("div", { css: { padding: 16, height: '100vh' } },
            (0, core_1.jsx)(core_2.Typography, { variant: "h4", css: { marginBottom: 16 } }, "Sorry, AI Generator is currently only available for lessons"));
    }
    const lessonData = (_d = (_c = context.designerState) === null || _c === void 0 ? void 0 : _c.editingContentModel) === null || _d === void 0 ? void 0 : _d.data;
    if (!lessonData) {
        return (0, core_1.jsx)("div", { css: { padding: 16, height: '100vh' } },
            (0, core_1.jsx)(core_2.Typography, { variant: "h4", css: { marginBottom: 16 } }, "No lesson data found"));
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
    return ((0, core_1.jsx)("div", { css: { padding: 16, height: '100vh' } },
        (0, core_1.jsx)("div", { css: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 } },
            (0, core_1.jsx)(core_2.Typography, { variant: "h4" },
                "Use AICE to generate lesson resources for ",
                model),
            (0, core_1.jsx)(core_2.Button, { variant: "outlined", onClick: () => setModalOpen(true) }, "Set Credentials")),
        !requiresCredentials &&
            (0, core_1.jsx)(GeneratorPane_1.default, { lessonData: lessonData, clientId: clientId, clientSecret: clientSecret, awsAccessKeyId: awsAccessKeyId, awsSecretAccessKey: awsSecretAccessKey, context: context }),
        (0, core_1.jsx)(core_2.Dialog, { open: modalOpen, onClose: () => setModalOpen(false), maxWidth: "sm", fullWidth: true },
            (0, core_1.jsx)(core_2.DialogTitle, null, "Set AI Credentials"),
            (0, core_1.jsx)(core_2.DialogContent, { css: { paddingTop: 20 } },
                (0, core_1.jsx)("div", { css: { marginBottom: 16 } },
                    (0, core_1.jsx)(core_2.TextField, { autoFocus: true, label: "Client ID", fullWidth: true, variant: "outlined", value: formData.clientId, onChange: (e) => setFormData(Object.assign(Object.assign({}, formData), { clientId: e.target.value })) })),
                (0, core_1.jsx)("div", { css: { marginBottom: 16 } },
                    (0, core_1.jsx)(core_2.TextField, { label: "Client Secret", type: "password", fullWidth: true, variant: "outlined", value: formData.clientSecret, onChange: (e) => setFormData(Object.assign(Object.assign({}, formData), { clientSecret: e.target.value })) })),
                (0, core_1.jsx)("div", { css: { marginBottom: 16 } },
                    (0, core_1.jsx)(core_2.TextField, { label: "AWS Access Key ID", fullWidth: true, variant: "outlined", value: formData.awsAccessKeyId, onChange: (e) => setFormData(Object.assign(Object.assign({}, formData), { awsAccessKeyId: e.target.value })) })),
                (0, core_1.jsx)("div", { css: { marginBottom: 16 } },
                    (0, core_1.jsx)(core_2.TextField, { label: "AWS Secret Access Key", type: "password", fullWidth: true, variant: "outlined", value: formData.awsSecretAccessKey, onChange: (e) => setFormData(Object.assign(Object.assign({}, formData), { awsSecretAccessKey: e.target.value })) }))),
            (0, core_1.jsx)(core_2.DialogActions, null,
                (0, core_1.jsx)(core_2.Button, { onClick: () => setModalOpen(false) }, "Cancel"),
                (0, core_1.jsx)(core_2.Button, { onClick: handleSaveCredentials, color: "primary" }, "Save")))));
}
exports.default = AiGenerator;
sdk_1.Builder.register('editor.mainTab', {
    name: '✨ AI Generator',
    component: AiGenerator,
});
//# sourceMappingURL=AiGenerator.js.map