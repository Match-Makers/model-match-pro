const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: false
  });
  const context = await browser.newContext({
    recordVideo: {
      dir: './img/playwright'
    }
  });

  const page = await context.newPage();
  await page.goto('http://localhost:3000/login');
  await page.getByTestId('SignIn-username').click();
  await page.waitForTimeout(1500);
  await page.getByTestId('SignIn-username').fill('admin');
  await page.waitForTimeout(1500);
  await page.getByTestId('SignIn-username').press('Tab');
  await page.waitForTimeout(1500);
  await page.getByLabel('Password').fill('1234');
  await page.waitForTimeout(1500);
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.waitForTimeout(1500);
  await page.getByPlaceholder('Enter your prompt').click();
  await page.waitForTimeout(1500);
  await page.getByPlaceholder('Enter your prompt').fill('How do you do that thing you do?');
  await page.waitForTimeout(1500);
  await page.getByRole('button', { name: 'Bloom' }).click();
  await page.waitForTimeout(1500);
  await page.getByRole('button', { name: 'Puma' }).click();
  await page.waitForTimeout(1500);
  await page.getByRole('button', { name: 'gpt2', exact: true }).click();
  await page.waitForTimeout(1500);
  await page.getByRole('button', { name: 'Search' }).click();
  await page.waitForTimeout(5000);
  await page.getByRole('button', { name: 'History' }).click();
  await page.waitForTimeout(2000);
  await page.getByRole('button', { name: 'About' }).click();
  await page.waitForTimeout(2000);
  await page.getByRole('button', { name: 'Sign Out' }).click();
    await page.waitForTimeout(2000);
  await page.goto('http://localhost:3000/history');
  await page.goto('http://localhost:3000/login');

  // ---------------------
  await context.close();
  await browser.close();
})();