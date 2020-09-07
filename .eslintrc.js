module.exports = {
  root: true,
  env: {
    node: true,
    browser: true
  },
  extends: [
    'plugin:prettier/recommended',
    'prettier',
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  plugins: ['prettier'],
  rules: {},
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  }
}