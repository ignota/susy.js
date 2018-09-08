module.exports = api => ({
  plugins: [
    'autobind-class-methods',
    ['@babel/proposal-class-properties', {
      loose: true,
    }],
    ['@babel/proposal-decorators', {
      legacy: true,
    }],
    '@babel/proposal-do-expressions',
    '@babel/proposal-export-default-from',
    '@babel/proposal-export-namespace-from',
    '@babel/proposal-function-bind',
    '@babel/proposal-function-sent',
    '@babel/proposal-json-strings',
    '@babel/proposal-logical-assignment-operators',
    ['@babel/proposal-nullish-coalescing-operator', {
      loose: true,
    }],
    '@babel/proposal-numeric-separator',
    '@babel/proposal-optional-catch-binding',
    ['@babel/proposal-optional-chaining', {
      loose: true,
    }],
    ['@babel/proposal-pipeline-operator', {
      proposal: 'minimal',
    }],
    '@babel/proposal-throw-expressions',
    '@babel/syntax-dynamic-import',
    '@babel/syntax-import-meta',
    ['@babel/transform-classes', {
      loose: true,
    }],
    ['@babel/transform-runtime', {
      corejs: 2,
    }],
    api.env() === 'test' && 'istanbul',
    ['module-resolver', {
      root: api.env() === 'test'
        ? ['./src', './spec']
        : ['./src'],
    }],
    'ramda',
  ].filter(Boolean),
  presets: [
    ['@babel/env', {
      loose: true,
      modules: 'commonjs',
      targets: {
        browsers: ['last 4 versions'],
      },
      useBuiltIns: false,
    }],
  ],
})
