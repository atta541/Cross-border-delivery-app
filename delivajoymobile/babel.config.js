// module.exports = {
//   presets: ['module:metro-react-native-babel-preset'],
//   plugins: [
//     [
//       'module:react-native-dotenv',
//       {
//         moduleName: '@env',
//         path: '.env',
//         blocklist: null,
//         allowlist: null,
//         safe: false,
//         allowUndefined: true,
//       },
//     ],
//     'react-native-reanimated/plugin', // Keep this as it is for Reanimated support
//   ],
// };


module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
        blocklist: null,
        allowlist: null,
        safe: false,
        allowUndefined: true,
      },
    ],
    ['@babel/plugin-transform-class-properties', { loose: true }],
    ['@babel/plugin-transform-private-methods', { loose: true }],
    ['@babel/plugin-transform-private-property-in-object', { loose: true }],
    'react-native-reanimated/plugin', // Keep this as it is for Reanimated support
  ],
};
