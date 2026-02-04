### 核心框架

- React 19.2.4
- React DOM 19.2.4
- React Router DOM 7.13.0
- Zustand 5.0.11
- Ant Design 6.2.3

### 构建与运行环境

- Vite 8.0.0-beta.11
- Node.js ^20.0.0 || ^20.11.1 || >=22.0.0
- npm 作为包管理器（强制）

### 代码风格

- 遵循 eslint.config.mjs 配置

### 目录结构

- src/apis/ - API 接口
- src/assets/ - 静态资源
- src/common/ - 公共常量和函数
- src/components/ - 公共组件
- src/layout/ - 布局组件
- src/pages/ - 页面组件
- src/routes/ - 路由配置
- src/stores/ - Zustand 状态管理
- src/utils/ - 工具函数

### 性能注意

- 避免组件中直接使用复杂计算，优先使用 useMemo
- 避免不必要的重渲染，合理使用 React.memo
- 避免渲染函数中大量 DOM 操作

### 其他规范

- 组件命名使用 PascalCase
- 文件名与组件名保持一致
- 使用 Less 作为 CSS 预处理器
- 优先使用 Ant Design 组件
- 路由配置模块化管理
- API 调用统一封装在 src/apis/ 目录

### 遵循规则

- 严格按照项目目录结构组织代码
- 遵循现有代码风格和命名规范
- 使用项目已安装的依赖库
- 确保代码符合 ESLint 检查要求
- 提供清晰的代码注释和文档
