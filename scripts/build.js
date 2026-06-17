/**
 * 项目打包
 */
import { execSync } from 'node:child_process';

execSync('vite build', { stdio: 'inherit' });
