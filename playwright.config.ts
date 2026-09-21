import process from 'node:process';
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  expect: {
    timeout: 5000,
  },
  outputDir: 'test-results/playwright-artifacts',
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'playwright-report' }],
    ['junit', { outputFile: 'test-results/playwright-junit.xml' }],
  ],
  testDir: './tests/e2e',
  use: {
    baseURL: 'http://127.0.0.1:4173',
    trace: 'on-first-retry',
  },
  webServer: {
    // 默认显式开启 Mock 构建，保证模板 E2E 不依赖真实后端；
    // 真实后端 E2E 以 E2E_AUTH_MOCK=false 关闭 Mock，并用 E2E_AUTH_* 注入种子凭据
    command: 'pnpm build && pnpm preview --host 127.0.0.1 --port 4173',
    env: {
      VITE_ENABLE_MOCK: process.env.E2E_AUTH_MOCK ?? 'true',
    },
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    url: 'http://127.0.0.1:4173',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
