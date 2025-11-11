const { spawnSync } = require('node:child_process');
const path = require('node:path');

const gradleCommand = process.platform === 'win32' ? 'gradlew.bat' : './gradlew';
const args = ['assembleDebug', 'assembleAndroidTest', '-DtestBuildType=debug'];

const result = spawnSync(gradleCommand, args, {
  cwd: path.resolve(__dirname, '..', 'android'),
  stdio: 'inherit',
  shell: process.platform === 'win32',
});

if (result.status !== 0) {
  process.exit(result.status ?? 1);
}