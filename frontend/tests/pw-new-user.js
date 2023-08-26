// const { chromium } = require('playwright');

// (async () => {
//   const browser = await chromium.launch({
//     headless: false
//   });
//   // const context = await browser.newContext();
//   const context = await browser.newContext({
//     recordVideo: {
//       dir: './img/playwright'
//     }
//   });

//   const page = await context.newPage();
//   await page.goto('http://localhost:3000/login');
//   await page.waitForTimeout(1500);
//   await page.getByRole('link', { name: 'Sign Up' }).click();
//   await page.waitForTimeout(1500);
//   await page.getByLabel('Username').click();
//   await page.waitForTimeout(1500);
//   await page.getByLabel('Username').fill('bigOwada');
//   await page.waitForTimeout(1500);
//   await page.getByLabel('Username').press('Tab');
//   await page.waitForTimeout(1500);
//   await page.getByLabel('Password', { exact: true }).fill('1234');
//   await page.waitForTimeout(1500);
//   await page.getByLabel('Password', { exact: true }).press('Tab');
//   await page.waitForTimeout(1500);
//   await page.getByLabel('Confirm Password').fill('1234');
//   await page.waitForTimeout(1500);
//   await page.getByRole('button', { name: 'Sign Up' }).click();
//   await page.waitForTimeout(1500);
//   await page.getByPlaceholder('Enter your prompt').click();
//   await page.waitForTimeout(1500);
//   await page.getByPlaceholder('Enter your prompt').fill('What are the benefits of building 3-tier full-stack applications?');
//   await page.waitForTimeout(1500);
//   await page.getByRole('button', { name: 'Deci' }).click();
//   await page.waitForTimeout(1500);
//   await page.getByRole('button', { name: 'Astrid' }).click();
//   await page.waitForTimeout(1500);
//   await page.getByRole('button', { name: 'OpenAI GPT' }).click();
//   await page.waitForTimeout(1500);
//   await page.getByRole('button', { name: 'Search' }).click();
//   await page.waitForTimeout(5000);
//   await page.getByRole('button', { name: 'Search' }).click();
//   await page.waitForTimeout(1500);
//   await page.getByRole('button', { name: 'History' }).click();
//   await page.waitForTimeout(1500);
//   await page.getByRole('button', { name: 'Home' }).click();
//   await page.waitForTimeout(1500);
//   await page.getByRole('button', { name: 'History' }).click();
//   await page.waitForTimeout(1500);
//   await page.getByRole('button', { name: 'About' }).click();
//   await page.waitForTimeout(1500);
//   await page.getByRole('button', { name: 'Sign Out' }).click();
//   await page.waitForTimeout(1500);

//   // ---------------------
//   await context.close();
//   await browser.close();
// })();

const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: false
  });
  const randomInt = Math.floor(Math.random() * 10000) + 1;
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('http://localhost:3000/');
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.waitForTimeout(1500);
  await page.getByTestId('SignIn-username').click();
  await page.waitForTimeout(1500);
  await page.getByRole('link', { name: 'Sign Up' }).click();
  await page.waitForTimeout(1500);
  await page.getByLabel('Username').click();
  await page.waitForTimeout(1500);
  await page.getByLabel('Username').fill(`pwtestuser${randomInt}`);
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
  await page.getByPlaceholder('Enter your prompt').fill('tell me a story about a red balloon');
  await page.waitForTimeout(1500);
  await page.getByRole('button', { name: 'OpenAI GPT' }).click();
  await page.waitForTimeout(1500);
  await page.getByRole('button', { name: 'gpt2', exact: true }).click();
  await page.waitForTimeout(1500);
  await page.getByRole('button', { name: 'gpt2-XL' }).click();
  await page.waitForTimeout(1500);
  await page.getByRole('button', { name: 'Search' }).click();
  await page.waitForTimeout(5000);
  await page.getByPlaceholder('Enter your prompt').fill('why is pineapple a good pizza topping?');
  await page.waitForTimeout(8000);
  await page.getByRole('button', { name: 'Search' }).click();
  await page.waitForTimeout(1500);
  await page.getByRole('button', { name: 'History' }).click();
  await page.waitForTimeout(1500);
  await page.goto('http://localhost:3000/history');
  await page.waitForTimeout(1500);
  await page.getByText('tell me a story about a red balloon').click();
  await page.waitForTimeout(1500);
  await page.getByText('why is pineapple a good pizza topping?DeleteLoad').click();
  await page.waitForTimeout(1500);
  await page.getByText('tell me a story about a red balloonDelete').click();
  await page.waitForTimeout(1500);
  await page.getByText('why is pineapple a good pizza topping?Delete').click();
  await page.waitForTimeout(1500);
  // await page.locator('li').filter({ hasText: 'Fri, Aug 25, 2023, 04:50:31 PM: tell me a story about a red balloonDeleteOpenAI ' }).getByRole('button').click();
  // await page.getByText('Fri, Aug 25, 2023, 04:51:43 PM: why is pineapple a good pizza topping?').click();
  await page.getByRole('button', { name: 'About' }).click();
  await page.waitForTimeout(1500);
  await page.getByRole('button', { name: 'Home' }).click();
  await page.waitForTimeout(1500);
  await page.getByRole('button', { name: 'Sign Out' }).click();
  await page.waitForTimeout(1500);

  // ---------------------
  await context.close();
  await browser.close();
})();