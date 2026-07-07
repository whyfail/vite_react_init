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
    command: 'pnpm build && pnpm preview --host 127.0.0.1 --port 4173',
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
