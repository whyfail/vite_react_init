import { readFileSync } from 'node:fs';
import process from 'node:process';

const msgPath = process.argv[2];
const msg = readFileSync(msgPath, 'utf-8').trim();

// Commit message 格式规范
const commitRE = /^(?:revert: )?(?:feat|fix|docs|style|refactor|perf|test|build|ci|chore|types|wip|release)(?:\(.+\))?: .{1,50}/;

if (!commitRE.test(msg)) {
  console.error(`
  ❌ 提交信息格式不正确

  请使用规范的提交信息格式，以便自动生成更新日志。

  示例：

    feat: 添加新功能
    fix: 修复组件中的 bug
    docs: 更新文档
    style: 代码格式化
    refactor: 重构认证模块
    perf: 性能优化
    test: 添加单元测试
    build: 更新依赖
    ci: 配置 CI 流程
    chore: 更新配置文件
    types: 添加类型定义

  详细规范请参考：https://www.conventionalcommits.org/
  `);
  process.exit(1);
}
