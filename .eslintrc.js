module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true,
    jquery: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'off' : 'off', //error
    'no-debugger': process.env.NODE_ENV === 'production' ? 'off' : 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  globals: {
    $: true,
    jQuery: true
  }
}