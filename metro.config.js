const path = require('path');
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
	resolver: {
		alias: {
			'@app': path.resolve(__dirname, 'src/app'),
			'@features': path.resolve(__dirname, 'src/features'),
			'@appTypes': path.resolve(__dirname, 'src/types'),
		},
  	},
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
