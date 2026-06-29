<div align="center">
  <h1>✨ Vite React 企业级开发模板 ✨</h1>

  <p>
    🚀 为 AI 而生的企业级 React 项目模板<br>
    📦 开箱即用，内置清晰分层、AI 友好文档和现代化 UI 栈<br>
    🔧 集成路由、认证、API 封装、代码规范和开发约定
  </p>

  <div>
    <a href="https://vitejs.dev/" target="_blank">
      <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
    </a>
    <a href="https://react.dev/" target="_blank">
      <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    </a>
    <a href="https://eslint.org/" target="_blank">
      <img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white" alt="ESLint" />
    </a>
    <a href="https://zustand-demo.pmnd.rs/" target="_blank">
      <img src="https://img.shields.io/badge/Zustand-1F2937?style=for-the-badge&logo=zustand&logoColor=white" alt="Zustand" />
    </a>
    <a href="https://tailwindcss.com/" target="_blank">
      <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
    </a>
  </div>

  <br>

  <div>
    <img src="https://img.shields.io/badge/Node.js-%3E%3D20.0.0-brightgreen?style=flat-square" alt="Node.js" />
    <img src="https://img.shields.io/badge/pnpm-11.9.0-blue?style=flat-square" alt="pnpm" />
    <img src="https://img.shields.io/badge/License-MIT-yellowgreen?style=flat-square" alt="License" />
  </div>

</div>

---

这是一个为 AI 协作开发而生的企业级 React 项目模板。项目基于 Vite + React 构建，默认提供清晰的分层架构、AI 可读的开发约定、shadcn/ui + Tailwind CSS 现代 UI 栈，以及登录、路由守卫、API 封装、文档入口等模板能力，帮助团队和 AI Agent 更稳定地扩展业务代码。

## 🚀 技术栈

- **构建工具**：Vite 8.1.0
- **前端框架**：React 19.2.7
- **开发语言**：TypeScript 6.0.3
- **路由管理**：React Router DOM 7.18.0
- **状态管理**：Zustand 5.0.14
- **UI 组件库**：shadcn/ui
- **样式方案**：Tailwind CSS 4.3.1 + Less
- **图标方案**：Heroicons + lucide-react 1.22.0
- **代码规范**：ESLint 10.6.0
- **提交规范**：simple-git-hooks + lint-staged
- **API 封装**：Axios 1.18.1
- **React Hooks**：ahooks 3.9.7

## 📦 快速开始

### 环境要求

- Node.js "^20.19.0 || >=22.12.0"

### 包管理器

- 使用 pnpm@11.9.0 作为包管理器

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
pnpm run start
```

开发服务器将在 `http://localhost:5173` 启动，支持热更新。

### 项目打包

```bash
pnpm run build
```

打包后的文件将输出到 `dist` 目录。

## 📁 项目结构

```
src/
├── app/               # 应用装配、路由、通知、导航、全局样式
├── features/          # 业务功能模块，如 auth、docs
├── shared/            # 跨业务基础能力，如 ui、api、lib、config
├── assets/            # 静态资源（图片等）
├── utils/             # 独立工具函数
├── main.tsx           # 应用渲染入口
└── vite-env.d.ts      # Vite 与静态资源类型声明
```

### 主要目录说明

- **app/**：应用层，只放全局装配、路由转换、通知/导航适配和样式入口
- **features/**：业务模块，模块内聚页面、组件、store、api 等能力
- **features/auth/**：登录、session token 读写和认证相关能力
- **features/docs/**：登录后的默认文档入口，用于说明模板结构和开发约定
- **shared/ui/**：shadcn/ui 基础组件，禁止放业务逻辑
- **shared/api/**：HTTP 基础设施和请求封装
- **shared/lib/**：跨业务纯工具函数
- **shared/config/**：模板级常量和配置

## 🎯 核心功能

### 🌐 路由管理

> **智能路由系统，轻松管理页面跳转**

- ✅ 支持动态路由和嵌套路由
- ✅ 内置路由守卫（RouteGuard.tsx），保护敏感页面
- ✅ 优雅的 404 页面处理（Router404.tsx）
- ✅ 路由元信息类型声明（routes/types.ts）
- ✅ 流畅的路由切换动画效果

### 🧠 状态管理

> **轻量级状态管理，让数据流更清晰**

- ✅ 使用 Zustand 进行高效状态管理
- ✅ 推荐在 `features/<module>/store` 内维护模块局部状态
- ✅ 支持按业务模块隔离状态
- ✅ 易于扩展，适合各种规模的应用

### 🎨 UI 与样式

> **统一的基础组件和样式体系**

- ✅ 使用 Tailwind CSS 作为默认样式方案
- ✅ shadcn/ui 基础组件统一放在 `shared/ui`
- ✅ Heroicons 从 `@heroicons/react` 按需导入并用 Tailwind 控制样式
- ✅ 业务组件放在各自 feature 内，避免污染基础组件目录

### 🔌 API 封装

> **统一的 API 请求处理，简化后端交互**

- ✅ 基于 Axios 的优雅封装
- ✅ 强大的请求拦截器和响应拦截器
- ✅ 统一的错误处理机制
- ✅ 支持请求取消和重试

### 🛡️ 错误处理

> **全方位的错误捕获，提升用户体验**

- ✅ 全局错误边界（ErrorBoundary.tsx）
- ✅ 统一的错误页面（CommonError.tsx）
- ✅ 友好的错误提示
- ✅ 便于开发者调试和定位问题

### 📐 代码规范

> **严格的代码质量控制，确保团队协作效率**

- ✅ 集成 ESLint 进行代码质量检查
- ✅ simple-git-hooks + lint-staged 确保提交代码符合规范
- ✅ 统一的代码风格，提高代码可读性
- ✅ 自动修复常见代码问题
- ✅ TypeScript 严格类型检查，提交前可运行 `pnpm exec tsc --noEmit`

## 📝 提交规范

### 提交信息格式

- 建议直接使用AI生成符合规范的提交信息

### Git 提交流程

```bash
# 1. 添加所有变更
git add -A

# 2. 提交变更
git commit -m "[类型] 详细信息"

# 3. 同步远程分支（推荐使用 rebase）
git pull --rebase

# 4. 解决冲突（如果有）
# - 手动解决冲突
# - git add -A
# - git rebase --continue

# 5. 推送代码
git push
```

## 🛠️ 实用工具

### 🔍 代码定位

> **精准定位，提高开发效率**

- ✨ 使用 `code-inspector-plugin`，在页面中按住 `shift + alt` 点击元素
- 🚀 直接跳转到编辑器中对应的代码位置
- 💡 支持多种编辑器，包括 VS Code、WebStorm 等

### 📦 打包优化

> **高性能打包，优化用户体验**

- ✨ 开启 gzip / brotli 打包（vite-plugin-compression2），减小文件体积
- 📊 打包时展示产物大小细节
- ⚡ 优化加载速度，提升用户体验
- 🔧 支持自定义打包配置

### 📋 查看 ESLint 规则

> **可视化查看和管理 ESLint 规则**

```bash
npx @eslint/config-inspector
```

- ✨ 图形化界面展示所有 ESLint 规则
- 🎯 支持搜索和过滤规则
- 📝 查看规则详情和示例代码
- 🔧 方便调整和定制规则

## ⚙️ 配置文件说明

| 🔧 配置文件         | 📋 说明                           |
| ------------------- | --------------------------------- |
| `.env`              | 环境变量配置，管理不同环境的配置  |
| `vite.config.js`    | Vite 构建配置，优化打包和开发体验 |
| `eslint.config.mjs` | ESLint 代码规范配置               |
| `components.json`   | shadcn/ui 组件配置                |
| `tsconfig.json`     | TypeScript 项目配置               |
| `.npmrc`            | npm 包管理器配置                  |

### 开发调试开关

默认启动保持轻量，部分开发工具按需开启。可以在 `.env` 中修改默认值，也可以在命令行临时覆盖：

```env
VITE_ENABLE_DEVTOOLS=false
VITE_ENABLE_CODE_INSPECTOR=true
VITE_ENABLE_PERFORMANCE_MONITOR=false
VITE_ENABLE_COMPRESSION=true
VITE_ENABLE_LEGACY=true
VITE_ENABLE_WEB_UPDATE_NOTICE=false
VITE_ENABLE_MILLION=false
VITE_ENABLE_REACT_COMPILER=false
VITE_ENABLE_NO_BUG=false
```

```bash
# 开启 Vite DevTools
VITE_ENABLE_DEVTOOLS=true pnpm run start

# 开启页面元素定位源码
VITE_ENABLE_CODE_INSPECTOR=true pnpm run start

# 开启长任务性能监控
VITE_ENABLE_PERFORMANCE_MONITOR=true pnpm run start

# 开启构建压缩
VITE_ENABLE_COMPRESSION=true pnpm run build

# 开启 legacy 兼容构建
VITE_ENABLE_LEGACY=true pnpm run build

# 开启系统升级通知
VITE_ENABLE_WEB_UPDATE_NOTICE=true pnpm run build

# 开启 Million.js / React Compiler 等实验优化
VITE_ENABLE_MILLION=true VITE_ENABLE_REACT_COMPILER=true pnpm run build

# 开启 vite-plugin-no-bug
VITE_ENABLE_NO_BUG=true pnpm run build
```

## 🤝 协作开发

### 🌿 分支管理

> **清晰的分支策略，确保代码质量**

- 🎯 `main`：主分支，用于发布生产版本
- 🔨 `feature/xxx`：功能开发分支，如 `feature/login`
- 🐛 `fix/xxx`：bug 修复分支，如 `fix/bug-123`
- 🔧 `refactor/xxx`：代码重构分支

### 🧩 冲突处理

> **优雅解决代码冲突，保持提交记录整洁**

1. 📥 执行 `git pull --rebase` 拉取远程代码
2. 🔍 手动解决冲突文件中的冲突
3. ✅ 解决冲突后执行 `git add -A`
4. 🔄 执行 `git rebase --continue` 继续 rebase
5. 🚀 最后执行 `git push` 推送到远程仓库

## ⚠️ 注意事项

> **开发过程中的重要提示**

- 📦 项目使用 pnpm 作为包管理器
- ✅ 提交代码前请确保通过 ESLint 检查
- 📝 遵循提交规范，保持提交记录清晰
- 🔒 定期更新依赖包，确保项目安全性
- 📖 及时更新文档，保持文档与代码同步
- 🤝 团队协作时，定期进行代码 review

## 📄 许可证

<div align="center">
  <img src="https://img.shields.io/badge/License-MIT-yellowgreen?style=for-the-badge" alt="MIT License" />

  <p style="margin-top: 10px;">
    本项目采用 MIT 许可证，欢迎自由使用和修改。
  </p>
</div>

---

<div align="center">
  <h3>✨ 开始你的 React 项目之旅吧！ ✨</h3>
  <p>
    如果你觉得这个项目模板对你有帮助，欢迎给个 ⭐ Star 支持一下！
  </p>
</div>
