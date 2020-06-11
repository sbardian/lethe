// {
//   "plugins": [
//     "inline-import",
//     "@babel/plugin-proposal-class-properties",
//     "@babel/plugin-transform-flow-strip-types",
//     "@babel/plugin-transform-runtime",
//     "@babel/transform-react-jsx-source"
//   ],
//   "presets": ["babel-preset-expo"]
// }

module.exports = {
  plugins: [
    '@babel/plugin-transform-flow-strip-types', // must be first!
    '@babel/plugin-transform-runtime',
    '@babel/plugin-proposal-class-properties',
    '@babel/transform-react-jsx-source',
  ],
  presets: ['babel-preset-expo'],
};
