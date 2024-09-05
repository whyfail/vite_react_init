/**
 * 项目打包
 */
import { execSync } from 'child_process';
import fs from 'fs';

function checkFolderExists() {
  try {
    fs.accessSync('./.husky/_/husky.sh', fs.constants.F_OK);

    return true;
  } catch (error) {
    return false;
  }
}

function isGitInitialized() {
  try {
    execSync('git rev-parse --is-inside-work-tree');

    return true;
  } catch (error) {
    return false;
  }
}

if (!isGitInitialized()) {
  console.error('项目尚未进行Git初始化, 请先执行 "git init" 初始化项目。');
  process.exit(1);
} else {
  if (!checkFolderExists()) {
    try {
      execSync('npx husky install', { stdio: 'inherit' });
    } catch (error) {
      console.error(error.message);
      process.exit(1);
    }
  }

  try {
    execSync('vite build', { stdio: 'inherit' });
  } catch (error) {
    console.debug('结束打包脚本');
  }
}
