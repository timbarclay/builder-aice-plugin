import { jsx } from '@emotion/core';
import { Builder } from '@builder.io/sdk';
import { Typography } from '@material-ui/core';

function AiGenerator() {
    return jsx("div", null,
        jsx(Typography, null, "AI Generator"));
}
Builder.register('editor.mainTab', {
    name: '✨ AI Generator',
    component: () => jsx("div", null, "Hello"),
});

export { AiGenerator as default };
//# sourceMappingURL=plugin-ai-generator.es5.js.map
