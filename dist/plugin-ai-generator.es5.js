import { jsx } from '@emotion/core';
import { Builder } from '@builder.io/sdk';
import { Typography } from '@material-ui/core';
import appContext from '@builder.io/app-context';

const context = appContext;
console.log('appContext', appContext);
function AiGenerator() {
    var _a, _b, _c, _d;
    console.log('appContext', appContext);
    const model = (_b = (_a = context.designerState) === null || _a === void 0 ? void 0 : _a.editingContentModel) === null || _b === void 0 ? void 0 : _b.data.get('name');
    const type = (_d = (_c = context.designerState) === null || _c === void 0 ? void 0 : _c.editingModel) === null || _d === void 0 ? void 0 : _d.name;
    return jsx("div", null,
        jsx(Typography, null,
            "AI Generator ",
            type,
            ": ",
            model));
}
Builder.register('editor.mainTab', {
    name: '✨ AI Generator',
    component: AiGenerator,
});

export { AiGenerator as default };
//# sourceMappingURL=plugin-ai-generator.es5.js.map
