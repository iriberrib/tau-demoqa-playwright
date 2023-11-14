import { test } from '@playwright/test';
import LoginPage from '../pages/login-page';
import pages from '../../utils/pages';
import userData from '../../data/user-data';

const userName = process.env.USERNAME!;
const password = process.env.PASSWORD!;
let loginPage: LoginPage;

test.use({ storageState: { cookies: [], origins: [] } }); // doesn't share the logged in session
// test.use({ storageState: undefined }); // https://github.com/microsoft/playwright/issues/17396
test.describe.configure({ mode: 'serial' });

test.beforeEach(async ({ page }) => {
  await page.goto(pages.loginPage);
  loginPage = new LoginPage(page);
});

//Test scenarios
test.describe('Book Store - Login', () => {
  //Login exitoso
  test(`successfull login`, async () => {
    await loginPage.doLogin(userName, password);
    await loginPage.checkLoggedIn();
  });
  //Login invalido por username invalido
  test(`failing login - invalid username`, async () => {
    const invalidUsername = userData.invalidUsername;
    await loginPage.doLogin(invalidUsername, password);
    await loginPage.checkInvalidCredentials();
  });
  //Login invalido por contrasena invalida
  test(`failing login - invalid password`, async () => {
    const invalidPassword = userData.invalidPassword;
    await loginPage.doLogin(userName, invalidPassword);
    await loginPage.checkInvalidCredentials();
  });
});

