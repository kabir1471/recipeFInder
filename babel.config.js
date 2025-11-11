module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
        alias: {
          '@app': './src/app',
          '@features': './src/features',
          '@appTypes': './src/types',
        },
      },
    ],
  ],
};
