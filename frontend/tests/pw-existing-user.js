const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: false
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.waitForTimeout(1500);
  await page.goto('http://localhost:3000/');
  await page.waitForTimeout(4500);
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.waitForTimeout(1500);
  await page.getByTestId('SignIn-username').click();
  await page.waitForTimeout(1500);
  await page.getByTestId('SignIn-username').fill('pwtestuser');
  await page.waitForTimeout(1500);
  await page.getByTestId('SignIn-username').press('Tab');
  await page.waitForTimeout(1500);
  await page.getByLabel('Password').fill('pwtestuser');
  await page.waitForTimeout(1500);
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.waitForTimeout(4500);
  await page.getByLabel('Enter your prompt').click();
  await page.waitForTimeout(1500);
  await page.getByLabel('Enter your prompt').fill('Tigers love tunafish sandwiches because');
  await page.waitForTimeout(1500);
  await page.getByRole('button', { name: 'OpenAI GPT' }).click();
  await page.waitForTimeout(1500);
  await page.getByRole('button', { name: 'Puma' }).click();
  await page.waitForTimeout(1500);
  await page.getByRole('button', { name: 'Neo-125M', exact: true }).click();
  await page.waitForTimeout(1500);
  await page.getByRole('button', { name: 'Search' }).click();
  await page.waitForTimeout(7500);
  await page.getByLabel('Enter your prompt').click();
  await page.waitForTimeout(1500);
  await page.getByLabel('Enter your prompt').fill('It was a dark and');
  await page.waitForTimeout(1500);
  await page.getByRole('button', { name: 'Search' }).click();
  await page.waitForTimeout(7500);
  await page.getByLabel('Enter your prompt').click();
  await page.waitForTimeout(1500);
  await page.getByLabel('Enter your prompt').fill('The greatest thing you will ever learn is');
  await page.waitForTimeout(1500);
  await page.getByRole('button', { name: 'Search' }).click();
  await page.waitForTimeout(7500);
  await page.getByRole('button', { name: 'History' }).click();
  await page.waitForTimeout(1500);
  await page.locator('div').filter({ hasText: 'The greatest thing you will ever learn is' }).nth(1).click();
  await page.waitForTimeout(1500);
  await page.getByText('Tigers love tunafish sandwiches becauseRetryDelete').click();
  await page.waitForTimeout(1500);
  await page.getByRole('button', { name: 'Delete' }).first().click();
  await page.waitForTimeout(2000);
  await page.getByRole('button', { name: 'About' }).click();
  await page.waitForTimeout(5000);
  await page.getByRole('button', { name: 'Sign Out' }).click();
  await page.waitForTimeout(5000);

  // ---------------------
  await context.close();
  await browser.close();
})();