(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('@emotion/core'), require('@builder.io/sdk'), require('@material-ui/core'), require('@builder.io/app-context')) :
  typeof define === 'function' && define.amd ? define(['@emotion/core', '@builder.io/sdk', '@material-ui/core', '@builder.io/app-context'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.aiGenerator = factory(global.core, global.sdk, global.core$1, global.appContext));
})(this, (function (core, sdk, core$1, appContext) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var appContext__default = /*#__PURE__*/_interopDefaultLegacy(appContext);

  const context = appContext__default["default"];
  console.log('appContext', appContext__default["default"]);
  function AiGenerator() {
      var _a, _b, _c, _d;
      console.log('appContext', appContext__default["default"]);
      const model = (_b = (_a = context.designerState) === null || _a === void 0 ? void 0 : _a.editingContentModel) === null || _b === void 0 ? void 0 : _b.data.get('name');
      const type = (_d = (_c = context.designerState) === null || _c === void 0 ? void 0 : _c.editingModel) === null || _d === void 0 ? void 0 : _d.name;
      return core.jsx("div", null,
          core.jsx(core$1.Typography, null,
              "AI Generator ",
              type,
              ": ",
              model));
  }
  sdk.Builder.register('editor.mainTab', {
      name: '✨ AI Generator',
      component: AiGenerator,
  });

  return AiGenerator;

}));
//# sourceMappingURL=plugin-ai-generator.umd.js.map
