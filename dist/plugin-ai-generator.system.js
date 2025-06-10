System.register(['@emotion/core', '@builder.io/sdk', '@material-ui/core', '@builder.io/app-context'], (function (exports) {
  'use strict';
  var jsx, Builder, Typography, appContext;
  return {
    setters: [function (module) {
      jsx = module.jsx;
    }, function (module) {
      Builder = module.Builder;
    }, function (module) {
      Typography = module.Typography;
    }, function (module) {
      appContext = module["default"];
    }],
    execute: (function () {

      exports('default', AiGenerator);

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

    })
  };
}));
//# sourceMappingURL=plugin-ai-generator.system.js.map
