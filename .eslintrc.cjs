/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-prettier",
  ],
  rules: {
    "prettier/prettier": ["error", { endOfLine: "auto" }],
    "vue/no-multiple-template-root": "off",
    "vue/multi-word-component-names": "off",
  },
  overrides: [
    {
      // 設定要使用的路徑
      files: ["src/**/*.vue"],
    },
  ],
  env: {
    "vue/setup-compiler-macros": true,
    browser: true,
    amd: true,
    node: true,
  },
};
