<div align="center">
  <h1>✨ Vite React 企业级开发模板 ✨</h1>

  <p>
    🚀 基于 Vite + React 构建的现代化前端项目模板<br>
    📦 开箱即用，包含完整的项目架构和最佳实践<br>
    🔧 集成路由、状态管理、API 封装、代码规范等核心功能
  </p>

  <div>
    <a href="https://vitejs.dev/" target="_blank">
      <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
    </a>
    <a href="https://react.dev/" target="_blank">
      <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
    </a>
    <a href="https://eslint.org/" target="_blank">
      <img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white" alt="ESLint" />
    </a>
    <a href="https://zustand-demo.pmnd.rs/" target="_blank">
      <img src="https://img.shields.io/badge/Zustand-1F2937?style=for-the-badge&logo=zustand&logoColor=white" alt="Zustand" />
    </a>
    <a href="https://unocss.dev/" target="_blank">
      <img src="https://img.shields.io/badge/Unocss-333333?style=for-the-badge&logo=unocss&logoColor=white" alt="Unocss" />
    </a>
  </div>

  <br>

  <div>
    <img src="https://img.shields.io/badge/Node.js-%3E%3D16.0.0-brightgreen?style=flat-square" alt="Node.js" />
    <img src="https://img.shields.io/badge/npm-%3E%3D8.0.0-blue?style=flat-square" alt="npm" />
    <img src="https://img.shields.io/badge/License-MIT-yellowgreen?style=flat-square" alt="License" />
  </div>

</div>

---

这是一个精心设计的现代化前端项目模板，基于 Vite + React 构建，集成了业内最佳实践，帮助你快速启动高质量的 React 应用开发。

## 🚀 技术栈

- **构建工具**：Vite 8
- **前端框架**：React 19
- **路由管理**：React Router
- **状态管理**：Zustand
- **样式方案**：Less + Unocss
- **代码规范**：ESLint
- **提交规范**：Husky + lint-staged
- **API 封装**：Axios

## 📦 快速开始

### 环境要求

- Node.js >= 20.0.0
- npm >= 10.0.0

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run start
```

开发服务器将在 `http://localhost:5173` 启动，支持热更新。

### 项目打包

```bash
npm run build
```

打包后的文件将输出到 `dist` 目录。

## 📁 项目结构

```
src/
├── apis/              # API 请求封装
├── assets/            # 静态资源（CSS、图片等）
├── common/            # 公共常量和工具函数
├── components/        # 公共组件
├── layout/            # 页面布局
├── pages/             # 页面组件
├── routes/            # 路由配置
├── stores/            # 状态管理
├── utils/             # 工具函数
├── App.jsx            # 应用入口组件
└── main.jsx           # 应用渲染入口
```

### 主要目录说明

- **apis/**：封装了与后端交互的 API 请求，按模块划分
- **components/**：可复用的公共组件，如 Loading、ErrorBoundary 等
- **pages/**：页面组件，按功能模块划分
- **routes/**：路由配置，管理页面跳转关系
- **stores/**：使用 Zustand 进行状态管理
- **utils/**：通用工具函数，如认证、时间处理等

## 🎯 核心功能

### 🌐 路由管理

> **智能路由系统，轻松管理页面跳转**

- ✅ 支持动态路由和嵌套路由
- ✅ 内置路由守卫（RouterAuth.jsx），保护敏感页面
- ✅ 优雅的 404 页面处理（Router404.jsx）
- ✅ 流畅的路由切换动画效果

### 🧠 状态管理

> **轻量级状态管理，让数据流更清晰**

- ✅ 使用 Zustand 进行高效状态管理
- ✅ 内置用户信息管理（storeUser.js）
- ✅ 支持多模块状态隔离
- ✅ 易于扩展，适合各种规模的应用

### 🔌 API 封装

> **统一的 API 请求处理，简化后端交互**

- ✅ 基于 Axios 的优雅封装
- ✅ 强大的请求拦截器和响应拦截器
- ✅ 统一的错误处理机制
- ✅ 支持请求取消和重试

### 🛡️ 错误处理

> **全方位的错误捕获，提升用户体验**

- ✅ 全局错误边界（ErrorBoundary.jsx）
- ✅ 统一的错误页面（CommonError.jsx）
- ✅ 友好的错误提示
- ✅ 便于开发者调试和定位问题

### 📐 代码规范

> **严格的代码质量控制，确保团队协作效率**

- ✅ 集成 ESLint 进行代码质量检查
- ✅ Husky + lint-staged 确保提交代码符合规范
- ✅ 统一的代码风格，提高代码可读性
- ✅ 自动修复常见代码问题

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

### 📺 大屏适配

> **完美适配各种屏幕尺寸**

- ✨ 集成 `autofit.js` 用于大屏适配
- 📱 支持响应式设计，适配从手机到大屏显示器
- 🎨 自动调整元素大小和位置，保持良好的视觉效果

### 📦 打包优化

> **高性能打包，优化用户体验**

- ✨ 开启 gzip 打包（viteCompression），减小文件体积
- 📊 打包时展示包大小细节（rollup-plugin-visualizer）
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
| `unocss.config.js`  | Unocss 原子化 CSS 配置            |
| `jsconfig.json`     | JavaScript 项目配置               |
| `.npmrc`            | npm 包管理器配置                  |

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

- 📦 项目使用 npm 作为包管理器
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
