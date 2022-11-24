/**
 * 自动升级package.json中的version小本版号
 */
import { execSync } from 'child_process';
import fs from 'fs';

const packageJsonStr = fs.readFileSync('./package.json').toString();

try {
  const packageJson = JSON.parse(packageJsonStr);
  // 升级版本号
  const arr = packageJson.version.split('.');

  arr[2] = +arr[2] + 1;

  const newVersion = arr.join('.');

  packageJson.version = newVersion;

  console.info('版本升级为' + newVersion);

  fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, '\t'));

  execSync(`git add package.json`);
} catch (e) {
  console.error('处理package.json失败，请重试', e.message);
  process.exit(1);
}
