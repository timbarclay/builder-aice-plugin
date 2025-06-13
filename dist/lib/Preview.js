"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@emotion/core");
const core_2 = require("@material-ui/core");
function Preview({ content, onCreateResource, onCreateVisualResource, isCreatingResource, isCreatingVisualResource, createdResourceId, createdVisualResourceId }) {
    if (!content) {
        return (0, core_1.jsx)("div", null, "Preview");
    }
    return ((0, core_1.jsx)(core_2.Paper, { css: { padding: 24, height: '100%', overflow: 'auto' } },
        (0, core_1.jsx)("div", { css: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 } },
            (0, core_1.jsx)(core_2.Typography, { variant: "h6" }, "Generated Content"),
            (0, core_1.jsx)("div", { css: { display: 'flex', gap: 8 } },
                createdResourceId ? ((0, core_1.jsx)(core_2.Button, { variant: "contained", color: "secondary", size: "small", onClick: () => window.open(`https://builder.io/content/${createdResourceId}`, '_blank') }, "View Structured Resource")) : onCreateResource && ((0, core_1.jsx)(core_2.Button, { variant: "contained", color: "primary", onClick: onCreateResource, disabled: isCreatingResource || isCreatingVisualResource, size: "small" }, isCreatingResource ? 'Creating...' : 'Create Structured Resource')),
                createdVisualResourceId ? ((0, core_1.jsx)(core_2.Button, { variant: "contained", color: "secondary", size: "small", onClick: () => window.open(`https://builder.io/content/${createdVisualResourceId}`, '_blank') }, "View Visual Resource")) : onCreateVisualResource && ((0, core_1.jsx)(core_2.Button, { variant: "outlined", color: "primary", onClick: onCreateVisualResource, disabled: isCreatingResource || isCreatingVisualResource, size: "small" }, isCreatingVisualResource ? 'Creating...' : 'Create Visual Resource')))),
        (0, core_1.jsx)("div", { css: { marginBottom: 24 } },
            (0, core_1.jsx)(core_2.Typography, { variant: "subtitle2", css: { marginBottom: 8, fontWeight: 'bold' } }, "Article:"),
            (0, core_1.jsx)(core_2.Typography, { variant: "body2", css: { whiteSpace: 'pre-wrap', lineHeight: 1.6 } }, content.body)),
        (0, core_1.jsx)(core_2.Divider, { css: { marginBottom: 16 } }),
        (0, core_1.jsx)(core_2.Typography, { variant: "subtitle2", css: { marginBottom: 12, fontWeight: 'bold' } }, "Comprehension Questions:"),
        content.questions.map((q, index) => ((0, core_1.jsx)("div", { key: index, css: { marginBottom: 12 } },
            (0, core_1.jsx)(core_2.Typography, { variant: "body2", css: { fontWeight: 500 } },
                index + 1,
                ". ",
                q.question),
            (0, core_1.jsx)(core_2.Typography, { variant: "body2", color: "textSecondary", css: { marginLeft: 16 } },
                "Answer: ",
                q.answer))))));
}
exports.default = Preview;
//# sourceMappingURL=Preview.js.map