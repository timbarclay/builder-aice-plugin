import React, { useState } from 'react';
import { jsx } from '@emotion/core';
import { Builder } from '@builder.io/sdk';
import { Paper, Typography, TextField, Button, Grid, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import { toJS } from 'mobx';

/** @jsx jsx */
function GeneratorForm({ lessonData, disabled, onGenerate }) {
    var _a, _b, _c;
    const [title, setTitle] = useState(lessonData.get('name') || '');
    const [learningObjective, setLearningObjective] = useState(((_a = lessonData.get('skill')) === null || _a === void 0 ? void 0 : _a.value.data.learningObjective) || '');
    const [learningGoal, setLearningGoal] = useState(((_b = lessonData.get('skill')) === null || _b === void 0 ? void 0 : _b.value.data.learningGoal) || '');
    const [targetWordCount, setTargetWordCount] = useState(300);
    const [vocabularyWords, setVocabularyWords] = useState(((_c = toJS(lessonData.get('vocabularyWords'))) === null || _c === void 0 ? void 0 : _c.map((w) => { var _a; return (_a = w === null || w === void 0 ? void 0 : w.word) === null || _a === void 0 ? void 0 : _a.Default; }).join(', ')) || '');
    const handleGenerate = () => {
        onGenerate({
            title,
            learningObjective,
            learningGoal,
            targetWordCount,
            vocabularyWords: vocabularyWords.split(',').map((w) => w.trim()).filter((w) => w),
        });
    };
    return (jsx(Paper, { css: { padding: 24, height: '100%' } },
        jsx(Typography, { variant: "h6", css: { marginBottom: 16 } }, "Content Generation Settings"),
        jsx("div", { css: { marginBottom: 16 } },
            jsx(TextField, { label: "Title", fullWidth: true, variant: "outlined", value: title, onChange: (e) => setTitle(e.target.value) })),
        jsx("div", { css: { marginBottom: 16 } },
            jsx(TextField, { label: "Learning Objective", fullWidth: true, multiline: true, rows: 2, variant: "outlined", value: learningObjective, onChange: (e) => setLearningObjective(e.target.value) })),
        jsx("div", { css: { marginBottom: 16 } },
            jsx(TextField, { label: "Learning Goal", fullWidth: true, multiline: true, rows: 2, variant: "outlined", value: learningGoal, onChange: (e) => setLearningGoal(e.target.value) })),
        jsx("div", { css: { marginBottom: 16 } },
            jsx(TextField, { label: "Target Word Count", fullWidth: true, type: "number", variant: "outlined", value: targetWordCount, onChange: (e) => setTargetWordCount(parseInt(e.target.value) || 300) })),
        jsx("div", { css: { marginBottom: 24 } },
            jsx(TextField, { label: "Vocabulary Words", fullWidth: true, multiline: true, rows: 3, variant: "outlined", placeholder: "Enter words separated by commas", value: vocabularyWords, onChange: (e) => setVocabularyWords(e.target.value), helperText: "Separate multiple words with commas" })),
        jsx(Button, { variant: "contained", color: "primary", fullWidth: true, size: "large", onClick: handleGenerate, disabled: disabled }, "Generate Content")));
}

function Preview() {
    return React.createElement("div", null, "Preview");
}

function GeneratorPane({ lessonData, clientId, clientSecret, awsAccessKeyId, awsSecretAccessKey }) {
    function onGenerate(parameters) {
        console.log('onGenerate', parameters);
    }
    return (React.createElement(Grid, { container: true, css: { height: '100%' } },
        React.createElement(Grid, { item: true, xs: 12, lg: 6 },
            React.createElement(GeneratorForm, { lessonData: lessonData, disabled: !clientId || !clientSecret || !awsAccessKeyId || !awsSecretAccessKey, onGenerate: onGenerate })),
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
    return (jsx("div", { css: { padding: 16, height: '100vh' } },
        jsx("div", { css: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 } },
            jsx(Typography, { variant: "h4" },
                "Use AICE to generate lesson resources for ",
                model),
            jsx(Button, { variant: "outlined", onClick: () => setModalOpen(true) }, "Set Credentials")),
        !requiresCredentials && jsx(GeneratorPane, { lessonData: lessonData, clientId: clientId, clientSecret: clientSecret, awsAccessKeyId: awsAccessKeyId, awsSecretAccessKey: awsSecretAccessKey }),
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

export { AiGenerator as default };
//# sourceMappingURL=plugin-ai-generator.es5.js.map
