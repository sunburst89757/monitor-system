module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["react-app", "plugin:prettier/recommended"],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-self-assign": "off",
    "jsx-a11y/anchor-is-valid": "off"
  }
};
