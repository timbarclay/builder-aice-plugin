System.register(['@emotion/core', '@builder.io/sdk', '@material-ui/core'], (function (exports) {
  'use strict';
  var jsx, Builder, Typography;
  return {
    setters: [function (module) {
      jsx = module.jsx;
    }, function (module) {
      Builder = module.Builder;
    }, function (module) {
      Typography = module.Typography;
    }],
    execute: (function () {

      exports('default', AiGenerator);

      function AiGenerator() {
          return jsx("div", null,
              jsx(Typography, null, "AI Generator"));
      }
      Builder.register('editor.mainTab', {
          name: '✨ AI Generator',
          component: () => jsx("div", null, "Hello"),
      });

    })
  };
}));
//# sourceMappingURL=plugin-ai-generator.system.js.map
