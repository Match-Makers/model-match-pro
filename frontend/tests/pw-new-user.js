const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: false
  });
  // const context = await browser.newContext();
  const context = await browser.newContext({
    recordVideo: {
      dir: './img/playwright'
    }
  });

  const page = await context.newPage();
  await page.goto('http://localhost:3000/login');
  await page.waitForTimeout(1500);
  await page.getByRole('link', { name: 'Sign Up' }).click();
  await page.waitForTimeout(1500);
  await page.getByLabel('Username').click();
  await page.waitForTimeout(1500);
  await page.getByLabel('Username').fill('bigOwada');
  await page.waitForTimeout(1500);
  await page.getByLabel('Username').press('Tab');
  await page.waitForTimeout(1500);
  await page.getByLabel('Password', { exact: true }).fill('1234');
  await page.waitForTimeout(1500);
  await page.getByLabel('Password', { exact: true }).press('Tab');
  await page.waitForTimeout(1500);
  await page.getByLabel('Confirm Password').fill('1234');
  await page.waitForTimeout(1500);
  await page.getByRole('button', { name: 'Sign Up' }).click();
  await page.waitForTimeout(1500);
  await page.getByPlaceholder('Enter your prompt').click();
  await page.waitForTimeout(1500);
  await page.getByPlaceholder('Enter your prompt').fill('What are the benefits of building 3-tier full-stack applications?');
  await page.waitForTimeout(1500);
  await page.getByRole('button', { name: 'Deci' }).click();
  await page.waitForTimeout(1500);
  await page.getByRole('button', { name: 'Astrid' }).click();
  await page.waitForTimeout(1500);
  await page.getByRole('button', { name: 'OpenAI GPT' }).click();
  await page.waitForTimeout(1500);
  await page.getByRole('button', { name: 'Search' }).click();
  await page.waitForTimeout(5000);
  await page.getByRole('button', { name: 'Search' }).click();
  await page.waitForTimeout(1500);
  await page.getByRole('button', { name: 'History' }).click();
  await page.waitForTimeout(1500);
  await page.getByRole('button', { name: 'Home' }).click();
  await page.waitForTimeout(1500);
  await page.getByRole('button', { name: 'History' }).click();
  await page.waitForTimeout(1500);
  await page.getByRole('button', { name: 'About' }).click();
  await page.waitForTimeout(1500);
  await page.getByRole('button', { name: 'Sign Out' }).click();
  await page.waitForTimeout(1500);

  // ---------------------
  await context.close();
  await browser.close();
})();