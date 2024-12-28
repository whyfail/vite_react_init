/**
 * 项目打包
 */
import { execSync } from 'node:child_process';
import process from 'node:process';

function isGitInitialized() {
  try {
    execSync('git rev-parse --is-inside-work-tree');

    return true;
  } catch (error) {
    console.error(error.message);

    return false;
  }
}

if (!isGitInitialized()) {
  console.error('项目尚未进行Git初始化, 请先执行 "git init" 初始化项目。');
  process.exit(1);
} else {
  try {
    execSync('vite build', { stdio: 'inherit' });
  } catch (error) {
    console.error(error.message);
    console.debug('结束打包脚本');
  }
}
