module.exports = {
  parser: 'babel-eslint',
  extends: ['plugin:prettier/recommended'],
  plugins: ['prettier', 'react'],
  env: {
    node: false,
    browser: true,
    jest: true
  }
}
