import { expect, type Locator, type Page } from '@playwright/test';
import { errorsMessage } from '../../../helpers/errorsMessage';
import { testUserData } from '../../../helpers/testUserData';

export class LoginPage {
  readonly page: Page;
  readonly getInputEmailField: Locator;
  readonly getInputPasswordField: Locator;
  readonly getButtonLogin: Locator;
  readonly getErrorMessageForInvalidCredentialsBLock: Locator;

  constructor(page: Page) {
    this.page = page;
    this.getInputEmailField = page.getByPlaceholder('Username');
    this.getInputPasswordField = page.getByPlaceholder('Password');
    this.getButtonLogin = page.getByText('Login');
    this.getErrorMessageForInvalidCredentialsBLock = page.getByText(
      errorsMessage.login.errorMessageForInvalidCredentials
    );
  }

  async openPage() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async successfulLoginWithValidCredentials() {
    await this.getInputEmailField.fill(testUserData.correctData.userNamne);
    await this.getInputPasswordField.fill(testUserData.correctData.password);
    await this.getButtonLogin.click();
    await expect(this.page).toHaveURL(
      'https://www.saucedemo.com/inventory.html'
    );
  }

  async triggerErrorMessageForInvalidCredentials() {
    await this.getInputEmailField.fill(testUserData.incorrectData.userNamne);
    await this.getInputPasswordField.fill(testUserData.incorrectData.password);
    await this.getButtonLogin.click();
    await expect(this.getErrorMessageForInvalidCredentialsBLock).toBeVisible();
    await expect(this.getErrorMessageForInvalidCredentialsBLock).toHaveText(
      errorsMessage.login.errorMessageForInvalidCredentials
    );
  }
}
