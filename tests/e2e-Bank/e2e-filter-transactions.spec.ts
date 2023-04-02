import { test, expect } from '@playwright/test'
import { Navbar } from '../../page-objects/components/NavBar';
import {HomePage} from '../../page-objects/HomePage'
import {LoginPage} from '../../page-objects/LoginPage'
import { Tab } from '../../utils/constants';

test.describe('Filter Transactions', () => {
  let homePage: HomePage;
  let loginPage: LoginPage;
  let navbar: Navbar;
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    navbar = new Navbar(page)

    await homePage.visit();
    await homePage.clickOnSignIn();
    await loginPage.login( 'username','password',true)
  })

  test('Verify the results for each account', async ({ page }) => {
    await navbar.clickOnTab(Tab.AccountActivity)
    await page.selectOption('#aa_accountId', '2')
    const checkingAccount = await page.locator(
      '#all_transactions_for_account tbody tr'
    )
    await expect(checkingAccount).toHaveCount(3)

    await page.selectOption('#aa_accountId', '4')
    const loanAccount = await page.locator(
      '#all_transactions_for_account tbody tr'
    )
    await expect(loanAccount).toHaveCount(2)

    await page.selectOption('#aa_accountId', '6')
    const noResults = await page.locator('.well')
    await expect(noResults).toBeVisible()
  })
})
