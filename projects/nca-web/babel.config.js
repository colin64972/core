const babelLoaderPlugins =
  process.env.BUILD_ENV === 'production' ? ['transform-remove-console'] : []

module.exports = babel => {
  const isTest = babel.env('test')
  babel.cache(true)
  return {
    presets: [
      '@babel/preset-typescript',
      '@babel/preset-react',
      [
        '@babel/preset-env',
        {
          targets: {
            browsers: ['last 2 versions']
          },
          modules: isTest ? 'commonjs' : false
        }
      ]
    ],
    plugins: babelLoaderPlugins
  }
}
