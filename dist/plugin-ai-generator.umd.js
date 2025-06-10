(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('@emotion/core'), require('@builder.io/sdk'), require('@material-ui/core')) :
  typeof define === 'function' && define.amd ? define(['@emotion/core', '@builder.io/sdk', '@material-ui/core'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.aiGenerator = factory(global.core, global.sdk, global.core$1));
})(this, (function (core, sdk, core$1) { 'use strict';

  function AiGenerator() {
      return core.jsx("div", null,
          core.jsx(core$1.Typography, null, "AI Generator"));
  }
  sdk.Builder.register('editor.mainTab', {
      name: '✨ AI Generator',
      component: () => core.jsx("div", null, "Hello"),
  });

  return AiGenerator;

}));
//# sourceMappingURL=plugin-ai-generator.umd.js.map
