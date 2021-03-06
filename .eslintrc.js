module.exports = {
  root: true,
  extends: ["eslint:recommended", "plugin:prettier/recommended"],
  env: {
    node: true,
    es2017: true,
    jest: true,
  },
  parserOptions: {
    sourceType: "module",
  },
};
