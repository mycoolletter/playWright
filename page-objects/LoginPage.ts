import { expect, Locator, Page } from "@playwright/test";
export class LoginPage {
  readonly page: Page;
  readonly userNameInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userNameInput = page.locator("#user_login");
    this.passwordInput = page.locator("#user_password");
    this.submitButton = page.locator("text=Sign in");
    this.errorMessage = page.locator(".alert-error");
  }
  async login(username: string, password: string) {
    await this.userNameInput.type(username);
    await this.passwordInput.type(password);
    await this.submitButton.click();
    // await this.page.goto("http://zero.webappsecurity.com/bank/transfer-funds.html");

  }
  async assertErrorMessage(){
    await expect(this.errorMessage).toContainText(
        "Login and/or password are wrong"
    )
  }
}
