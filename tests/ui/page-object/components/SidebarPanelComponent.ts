import { expect, type Locator, type Page } from '@playwright/test';

export class SidebarPanelComponent {
  readonly page: Page;
  readonly getOpenSidebarButton: Locator;
  readonly getLogOutNavigateButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.getOpenSidebarButton = page.getByTestId('open-menu');
    this.getLogOutNavigateButton = page.getByTestId('logout-sidebar-link');
  }

  async openSidebar() {
    expect(this.getOpenSidebarButton).toBeVisible();
    await this.getOpenSidebarButton.click({ force: true });
  }

  async clickLogoutButton() {
    expect(this.getLogOutNavigateButton).toBeVisible();
    await this.getLogOutNavigateButton.click();
  }
}
