"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@emotion/core");
const sdk_1 = require("@builder.io/sdk");
const core_2 = require("@material-ui/core");
function AiGenerator() {
    return (0, core_1.jsx)("div", null,
        (0, core_1.jsx)(core_2.Typography, null, "AI Generator"));
}
exports.default = AiGenerator;
sdk_1.Builder.register('editor.mainTab', {
    name: '✨ AI Generator',
    component: () => (0, core_1.jsx)("div", null, "Hello"),
});
//# sourceMappingURL=AiGenerator.js.map