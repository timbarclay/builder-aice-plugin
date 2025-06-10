"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@emotion/core");
const sdk_1 = require("@builder.io/sdk");
const core_2 = require("@material-ui/core");
// Import the app context - will be available at runtime in Builder.io
const app_context_1 = __importDefault(require("@builder.io/app-context"));
const context = app_context_1.default;
function AiGenerator() {
    console.log(context);
    return (0, core_1.jsx)("div", null,
        (0, core_1.jsx)(core_2.Typography, null, "AI Generator"));
}
exports.default = AiGenerator;
sdk_1.Builder.register('editor.mainTab', {
    name: '✨ AI Generator',
    component: () => (0, core_1.jsx)("div", null, "Hello"),
});
//# sourceMappingURL=AiGenerator.js.map