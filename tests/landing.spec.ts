import { expect, test } from '@playwright/test';

test('home carga en es', async ({ page }) => {
  await page.goto('/es');
  await expect(page.locator('h1')).toBeVisible();
});

test('ruta en existe', async ({ page }) => {
  await page.goto('/en');
  await expect(page).toHaveURL(/\/en/);
});

test('validacion formulario', async ({ page }) => {
  await page.goto('/es');

  await expect(page.locator('input[name="company"]')).toHaveAttribute('required', '');
  await expect(page.locator('input[name="position"]')).toHaveAttribute('required', '');
  await expect(page.locator('input[name="email"]')).toHaveAttribute('required', '');
  await expect(page.locator('textarea[name="message"]')).toHaveAttribute('required', '');
  await expect(page.locator('textarea[name="message"]')).toHaveAttribute('minlength', '10');
});
