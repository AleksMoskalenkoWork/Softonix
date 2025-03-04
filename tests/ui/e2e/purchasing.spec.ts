import test, { expect } from '@playwright/test';
import { beforeEach } from 'node:test';
import { LoginPage } from '../page-object/page/LoginPage';
import { SidebarPanelComponent } from '../page-object/components/SidebarPanelComponent';
import { testUserData } from '../../helpers/testUserData';

test.describe('Purchasing Flow', () => {
  let LoginPageInstance;
  let SidebarPanelComponentInstance;

  test.beforeEach(async ({ page }) => {
    LoginPageInstance = new LoginPage(page);
    SidebarPanelComponentInstance = new SidebarPanelComponent(page);
    await LoginPageInstance.openPage();
    await LoginPageInstance.successfulLoginWithValidCredentials();
  });

  test('Complete Successful Flow for Purchasing with order confirmation message indicating', async ({
    page,
  }) => {
    const inventoryItem = await page.getByTestId('inventory-item');
    await inventoryItem.first().getByText('Add to cart').click();
    await page.getByTestId('shopping-cart-link').click();
    await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
    await page.getByTestId('checkout').click();
    await expect(page).toHaveURL(
      'https://www.saucedemo.com/checkout-step-one.html'
    );
    await page
      .getByTestId('firstName')
      .fill(testUserData.correctData.userNamne);
    await page.getByTestId('lastName').fill(testUserData.correctData.password);
    await page
      .getByTestId('postalCode')
      .fill(testUserData.correctData.password);

    await page.getByTestId('continue').click();
    await expect(page).toHaveURL(
      'https://www.saucedemo.com/checkout-step-two.html'
    );
    await page.getByTestId('finish').click();
    await expect(page).toHaveURL(
      'https://www.saucedemo.com/checkout-complete.html'
    );
    const massegeCompleteSuccessfulPurchasingFlow = await page.getByTestId(
      'checkout-complete-container'
    );
    await expect(massegeCompleteSuccessfulPurchasingFlow).toBeVisible();
    await expect(massegeCompleteSuccessfulPurchasingFlow).toContainText(
      'Thank you for your order!'
    );
    await expect(massegeCompleteSuccessfulPurchasingFlow).toContainText(
      'Your order has been dispatched, and will arrive just as fast as the pony can get there!'
    );

    await page.getByTestId('back-to-products').click();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  });

  test.afterEach(async () => {
    await SidebarPanelComponentInstance.openSidebar();
    await SidebarPanelComponentInstance.clickLogoutButton();
  });
});
