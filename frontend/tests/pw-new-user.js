const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: false
  });
  const randomInt = Math.floor(Math.random() * 100000) + 1;

  const context = await browser.newContext();
  // const context = await browser.newContext({
  //   recordVideo: {
  //     dir: './img/playwright'
  //   }
  // });

  const page = await context.newPage();
  await page.goto('http://localhost:3000/');
  await page.waitForTimeout(4500);
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.waitForTimeout(4500);
  await page.getByRole('link', { name: 'Sign Up' }).click();
  await page.waitForTimeout(1500);
  await page.getByLabel('Username').click();
  await page.waitForTimeout(1500);
  await page.getByLabel('Username').fill(`pwtestuser${randomInt}`);
  await page.waitForTimeout(1500);
  await page.getByLabel('Username').press('Tab');
  await page.waitForTimeout(1500);
  await page.getByLabel('Password', { exact: true }).fill(`${randomInt}`);
  await page.waitForTimeout(1500);
  await page.getByLabel('Password', { exact: true }).press('Tab');
  await page.waitForTimeout(1500);
  await page.getByLabel('Confirm Password').fill(`${randomInt}`);
  await page.waitForTimeout(1500);
  await page.getByRole('button', { name: 'Sign Up' }).click();
  await page.waitForTimeout(1500);
  await page.getByLabel('Enter your prompt').fill('Introduce yourself in 4 sentences');
  await page.waitForTimeout(1500);
  await page.getByRole('button', { name: 'OpenAI GPT' }).click();
  await page.waitForTimeout(1500);
  await page.getByRole('button', { name: 'gpt2-XL' }).click();
  await page.waitForTimeout(1500);
  await page.getByRole('button', { name: 'gpt2', exact: true }).click();
  await page.waitForTimeout(1500);
  await page.getByRole('button', { name: 'Search' }).click();
  await page.waitForTimeout(6500);
  await page.getByLabel('Enter your prompt').click();
  await page.getByLabel('Enter your prompt').click();
  await page.getByLabel('Enter your prompt').click();
  await page.getByLabel('Enter your prompt').fill('what is it that makes pineapple a good topping for pizza?');
  await page.waitForTimeout(1500);
  await page.getByRole('button', { name: 'Search' }).click();
  await page.waitForTimeout(6500);
  await page.getByRole('button', { name: 'History' }).click();
  await page.waitForTimeout(2000);
  await page.getByText('what is it that makes pineapple a good topping f').click();
  await page.waitForTimeout(2000);
  await page.getByText('introduce yourself in 4 sentencesRetryDelete').click();
  await page.waitForTimeout(2000);
  await page.locator('div').filter({ hasText: 'what is it that makes pineapple a good topping f' }).nth(1).click();
  await page.waitForTimeout(2000);
  await page.getByRole('button', { name: 'Delete' }).first().click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'About' }).click();
  await page.waitForTimeout(5000);
  await page.getByRole('button', { name: 'Sign Out' }).click();
  await page.waitForTimeout(5000);

  // ---------------------
  await context.close();
  await browser.close();
})();