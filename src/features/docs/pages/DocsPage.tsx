import type { ComponentType, ReactElement, SVGProps } from 'react';
import {
  BellAlertIcon,
  BoltIcon,
  CircleStackIcon,
  CodeBracketSquareIcon,
  CubeTransparentIcon,
  DocumentTextIcon,
  FolderIcon,
  PaintBrushIcon,
  PuzzlePieceIcon,
  RocketLaunchIcon,
  ShieldCheckIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

interface LibraryItem {
  icon: ComponentType<SVGProps<SVGSVGElement>>
  name: string
  role: string
}

interface StructureItem {
  icon: ComponentType<SVGProps<SVGSVGElement>>
  path: string
  description: string
}

const structures: StructureItem[] = [
  {
    icon: RocketLaunchIcon,
    path: 'src/app',
    description: '只放应用组合：routes、layout、providers、notifications、navigation、global styles。',
  },
  {
    icon: FolderIcon,
    path: 'src/features',
    description: '业务归属目录：page、component、api、store、business logic 都跟随 feature。',
  },
  {
    icon: PuzzlePieceIcon,
    path: 'src/shared',
    description: '跨业务基础能力：ui、api、lib、config。不要放具体业务行为。',
  },
  {
    icon: ShieldCheckIcon,
    path: 'src/features/auth',
    description: '登录与 session 边界。token 读写只从这里走。',
  },
  {
    icon: DocumentTextIcon,
    path: 'src/features/docs',
    description: '模板说明入口。AI 规则以根目录 AGENTS.md 为准。',
  },
];

const libraries: LibraryItem[] = [
  {
    icon: BoltIcon,
    name: 'Vite',
    role: '开发服务器与构建入口。',
  },
  {
    icon: CubeTransparentIcon,
    name: 'React',
    role: '组件化视图与交互状态。',
  },
  {
    icon: FolderIcon,
    name: 'React Router DOM',
    role: 'HashRouter；路由集中在 app/routes。',
  },
  {
    icon: PaintBrushIcon,
    name: 'Tailwind CSS',
    role: '默认样式表达方式。',
  },
  {
    icon: PuzzlePieceIcon,
    name: 'shadcn/ui',
    role: '基础 UI primitives；只放 shared/ui。',
  },
  {
    icon: SparklesIcon,
    name: 'Heroicons',
    role: 'SVG 图标；从 @heroicons/react 按需导入。',
  },
  {
    icon: CubeTransparentIcon,
    name: 'Radix UI',
    role: 'shadcn 复杂交互组件底层。',
  },
  {
    icon: CodeBracketSquareIcon,
    name: 'Axios',
    role: 'HTTP 基础库；统一封装在 shared/api。',
  },
  {
    icon: BellAlertIcon,
    name: 'Sonner',
    role: 'Toast；业务通过 app/notifications 调用。',
  },
  {
    icon: CircleStackIcon,
    name: 'Zustand',
    role: 'feature-local 状态管理。',
  },
  {
    icon: SparklesIcon,
    name: 'ahooks',
    role: '复用常见 React hooks。',
  },
];

function DocsPage(): ReactElement {
  return (
    <main className="min-h-full bg-slate-950 text-slate-100">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-10">
        <header className="rounded-lg border border-cyan-400/20 bg-slate-900/80 p-8 shadow-[0_18px_60px_rgba(8,145,178,0.16)]">
          <p className="text-sm font-semibold text-cyan-300">React Template Guide</p>
          <h1 className="mt-3 text-3xl font-bold text-white">项目开发文档</h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">
            这是给开发者看的极简索引。AI 执行规则已同步到根目录 AGENTS.md；这里保留目录边界和依赖职责的短说明。
          </p>
        </header>

        <section className="grid gap-4 md:grid-cols-2">
          {structures.map((item) => {
            const Icon = item.icon;

            return (
              <article className="rounded-lg border border-slate-800 bg-slate-900 p-5" key={item.path}>
                <div className="flex items-center gap-3">
                  <Icon aria-hidden="true" className="size-5 text-cyan-300" />
                  <code className="text-sm font-semibold text-cyan-300">{item.path}</code>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-300">{item.description}</p>
              </article>
            );
          })}
        </section>

        <section className="rounded-lg border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-xl font-semibold text-white">推荐开发流程</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <div className="rounded-md bg-slate-950 p-4">
              <strong className="text-cyan-300">1. 建模块</strong>
              <p className="mt-2 text-sm leading-6 text-slate-300">业务代码进 features。</p>
            </div>
            <div className="rounded-md bg-slate-950 p-4">
              <strong className="text-cyan-300">2. 配路由</strong>
              <p className="mt-2 text-sm leading-6 text-slate-300">路由集中在 app/routes。</p>
            </div>
            <div className="rounded-md bg-slate-950 p-4">
              <strong className="text-cyan-300">3. 写接口</strong>
              <p className="mt-2 text-sm leading-6 text-slate-300">请求走 shared/api。</p>
            </div>
            <div className="rounded-md bg-slate-950 p-4">
              <strong className="text-cyan-300">4. 做验证</strong>
              <p className="mt-2 text-sm leading-6 text-slate-300">执行 pnpm lint/build。</p>
            </div>
          </div>
        </section>

        <section className="rounded-lg border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-xl font-semibold text-white">核心库职责</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {libraries.map(item => (
              <div className="rounded-md border border-slate-800 bg-slate-950 p-4" key={item.name}>
                <div className="flex items-center gap-3">
                  <item.icon aria-hidden="true" className="size-5 text-cyan-300" />
                  <h3 className="font-semibold text-slate-100">{item.name}</h3>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-300">{item.role}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <article className="rounded-lg border border-slate-800 bg-slate-900 p-5">
            <div className="flex items-center gap-3">
              <PaintBrushIcon aria-hidden="true" className="size-5 text-cyan-300" />
              <h2 className="text-lg font-semibold text-white">UI 约定</h2>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              基础组件放 shared/ui；业务组件留在 feature。
            </p>
          </article>
          <article className="rounded-lg border border-slate-800 bg-slate-900 p-5">
            <div className="flex items-center gap-3">
              <ShieldCheckIcon aria-hidden="true" className="size-5 text-cyan-300" />
              <h2 className="text-lg font-semibold text-white">副作用边界</h2>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              session、navigation、notification 都走封装层。
            </p>
          </article>
          <article className="rounded-lg border border-slate-800 bg-slate-900 p-5">
            <div className="flex items-center gap-3">
              <SparklesIcon aria-hidden="true" className="size-5 text-cyan-300" />
              <h2 className="text-lg font-semibold text-white">样式方式</h2>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              默认 Tailwind；全局样式只放 app/styles。
            </p>
          </article>
        </section>
      </section>
    </main>
  );
}

export default DocsPage;
