const path = require('path');

module.exports = {
	testRunner: {
		args: {
			config: path.resolve(__dirname, 'e2e/jest.config.js'),
		},
		jest: {
			setupTimeout: 120000,
			teardownTimeout: 30000,
		},
	},
	apps: {
		'android.debug': {
		type: 'android.apk',
		binaryPath: 'android/app/build/outputs/apk/debug/app-debug.apk',
		build: 'node ./scripts/detox-build-android.js',
		reversePorts: [8081],
		},
	},
	devices: {
		emulator: {
		type: 'android.emulator',
		device: {
			avdName: 'Pixel_XL_API_33',
		},
		},
		device: {
		type: 'android.attached',
		device: {
			adbName: '320494312121', // Replace with your device's adb name
		},
		},
	},
	configurations: {
		'android.emu.debug': {
		device: 'emulator',
		app: 'android.debug',
		},
		'android.device.debug': {
		device: 'device',
		app: 'android.debug',
		},
	},
};