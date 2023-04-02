import { expect, Locator, Page } from "@playwright/test";
import { Tab } from "../../utils/constants";

export class Navbar {
  readonly page: Page;
  readonly accountSummary: Locator;
  readonly accountActivity: Locator;
  readonly transferFunds: Locator;
  readonly payBills: Locator;
  readonly myMoneyApp: Locator;
  readonly onlineStatements: Locator;

  constructor(page: Page) {
    this.page = page;
    this.accountSummary = page.locator("#account_summary_tab");
    this.accountActivity = page.locator("#account_activity_tab");
    this.transferFunds = page.locator("#transfer_funds_tab");
    this.payBills = page.locator("#pay_bills_tab");
    this.myMoneyApp = page.locator("#money_map_tab");
    this.onlineStatements = page.locator("#online_statements_tab");
  }

  async clickOnTab(tabName : Tab) {
    switch (tabName) {
      case Tab.AccountSummary:
        await this.accountSummary.click();
        break;
      case Tab.AccountActivity:
        await this.accountActivity.click();
        break;
      case Tab.TransferFunds:
        await this.transferFunds.click();
        break;
      case Tab.PayBills:
        await this.payBills.click();
        break;
      case Tab.MyMoneyApp:
        await this.myMoneyApp.click();
        break;
      case Tab.OnlineStatements:
        await this.onlineStatements.click();
        break;
      default:
        throw new Error("This tab does not exist..");
    }
  }
}
