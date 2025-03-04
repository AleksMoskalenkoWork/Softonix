import test, { expect } from '@playwright/test';
import { LoginPage } from './page-object/page/LoginPage';

test.describe('Login', () => {
  let LoginPageInstance;

  test.beforeEach(async ({ page }) => {
    LoginPageInstance = new LoginPage(page);
    await LoginPageInstance.openPage();
  });

  test('Successful Login with Valid Credentials', async () => {
    await LoginPageInstance.successfulLoginWithValidCredentials();
  });

  test('Error Message for Invalid Credentials', async () => {
    await LoginPageInstance.triggerErrorMessageForInvalidCredentials();
  });
});
