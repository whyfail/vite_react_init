import { expect, test } from '@playwright/test';

// Mock E2E 使用默认演示账号；真实后端 E2E 通过环境变量注入种子管理员凭据
const E2E_USERNAME = process.env.E2E_AUTH_USERNAME ?? 'admin';
const E2E_PASSWORD = process.env.E2E_AUTH_PASSWORD ?? 'admin';

test.beforeEach(async ({ page }) => {
  const consoleErrors: string[] = [];

  page.on('console', (message) => {
    if (message.type() === 'error') {
      consoleErrors.push(message.text());
    }
  });

  await page.exposeFunction('getConsoleErrors', () => consoleErrors);

  await page.goto('/');
  await page.evaluate(() => {
    localStorage.clear();
    sessionStorage.clear();
  });
});

test('renders login for unauthenticated users on the protected home route', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: '登录' })).toBeVisible();
});

test('logs in and renders docs', async ({ page }) => {
  await page.goto('/#/login');
  await page.getByPlaceholder('请输入账号').fill(E2E_USERNAME);
  await page.getByPlaceholder('请输入登录密码').fill(E2E_PASSWORD);
  await page.getByRole('button', { name: '登录' }).click();

  await expect(page).toHaveURL(/#\/docs$/);
  await expect(page.getByRole('heading', { name: '项目开发文档' })).toBeVisible();
});

test('renders 404 fallback route', async ({ page }) => {
  await page.goto('/#/login');
  await page.getByPlaceholder('请输入账号').fill(E2E_USERNAME);
  await page.getByPlaceholder('请输入登录密码').fill(E2E_PASSWORD);
  await page.getByRole('button', { name: '登录' }).click();
  await expect(page).toHaveURL(/#\/docs$/);

  await page.goto('/#/not-found-smoke-test');

  await expect(page.locator('img')).toBeVisible();
});

test.afterEach(async ({ page }) => {
  const errors = await page.evaluate(async () => (window as unknown as {
    getConsoleErrors: () => Promise<string[]>
  }).getConsoleErrors());

  expect(errors).toEqual([]);
});
