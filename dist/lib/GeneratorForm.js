"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @jsx jsx */
const react_1 = require("react");
const core_1 = require("@emotion/core");
const core_2 = require("@material-ui/core");
const mobx_1 = require("mobx");
function GeneratorForm({ lessonData, disabled, onGenerate }) {
    var _a, _b, _c;
    const [title, setTitle] = (0, react_1.useState)(lessonData.get('name') || '');
    const [learningObjective, setLearningObjective] = (0, react_1.useState)(((_a = lessonData.get('skill')) === null || _a === void 0 ? void 0 : _a.value.data.learningObjective) || '');
    const [learningGoal, setLearningGoal] = (0, react_1.useState)(((_b = lessonData.get('skill')) === null || _b === void 0 ? void 0 : _b.value.data.learningGoal) || '');
    const [targetWordCount, setTargetWordCount] = (0, react_1.useState)(300);
    const [vocabularyWords, setVocabularyWords] = (0, react_1.useState)(((_c = (0, mobx_1.toJS)(lessonData.get('vocabularyWords'))) === null || _c === void 0 ? void 0 : _c.map((w) => { var _a; return (_a = w === null || w === void 0 ? void 0 : w.word) === null || _a === void 0 ? void 0 : _a.Default; }).join(', ')) || '');
    const handleGenerate = () => {
        onGenerate({
            title,
            learningObjective,
            learningGoal,
            targetWordCount,
            vocabularyWords: vocabularyWords.split(',').map((w) => w.trim()).filter((w) => w),
        });
    };
    return ((0, core_1.jsx)(core_2.Paper, { css: { padding: 24, height: '100%' } },
        (0, core_1.jsx)(core_2.Typography, { variant: "h6", css: { marginBottom: 16 } }, "Content Generation Settings"),
        (0, core_1.jsx)("div", { css: { marginBottom: 16 } },
            (0, core_1.jsx)(core_2.TextField, { label: "Title", fullWidth: true, variant: "outlined", value: title, onChange: (e) => setTitle(e.target.value) })),
        (0, core_1.jsx)("div", { css: { marginBottom: 16 } },
            (0, core_1.jsx)(core_2.TextField, { label: "Learning Objective", fullWidth: true, multiline: true, rows: 2, variant: "outlined", value: learningObjective, onChange: (e) => setLearningObjective(e.target.value) })),
        (0, core_1.jsx)("div", { css: { marginBottom: 16 } },
            (0, core_1.jsx)(core_2.TextField, { label: "Learning Goal", fullWidth: true, multiline: true, rows: 2, variant: "outlined", value: learningGoal, onChange: (e) => setLearningGoal(e.target.value) })),
        (0, core_1.jsx)("div", { css: { marginBottom: 16 } },
            (0, core_1.jsx)(core_2.TextField, { label: "Target Word Count", fullWidth: true, type: "number", variant: "outlined", value: targetWordCount, onChange: (e) => setTargetWordCount(parseInt(e.target.value) || 300) })),
        (0, core_1.jsx)("div", { css: { marginBottom: 24 } },
            (0, core_1.jsx)(core_2.TextField, { label: "Vocabulary Words", fullWidth: true, multiline: true, rows: 3, variant: "outlined", placeholder: "Enter words separated by commas", value: vocabularyWords, onChange: (e) => setVocabularyWords(e.target.value), helperText: "Separate multiple words with commas" })),
        (0, core_1.jsx)(core_2.Button, { variant: "contained", color: "primary", fullWidth: true, size: "large", onClick: handleGenerate, disabled: disabled }, "Generate Content")));
}
exports.default = GeneratorForm;
//# sourceMappingURL=GeneratorForm.js.map