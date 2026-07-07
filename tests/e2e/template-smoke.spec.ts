import { expect, test } from '@playwright/test';

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
  await page.getByRole('button', { name: '登录' }).click();

  await expect(page).toHaveURL(/#\/docs$/);
  await expect(page.getByRole('heading', { name: '项目开发文档' })).toBeVisible();
});

test('renders 404 fallback route', async ({ page }) => {
  await page.goto('/#/login');
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
