import { test, expect } from '@playwright/test'
import { Navbar } from '../../page-objects/components/NavBar';
import {HomePage} from '../../page-objects/HomePage'
import {LoginPage} from '../../page-objects/LoginPage'
import { Tab } from '../../utils/constants';

test.describe('Transfer Funds and Make Payments', () => {
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

  test('Transfer funds', async ({ page }) => {
    await navbar.clickOnTab(Tab.TransferFunds);
    await page.selectOption('#tf_fromAccountId', '2')
    await page.selectOption('#tf_toAccountId', '3')
    await page.type('#tf_amount', '500')
    await page.type('#tf_description', 'Test message')
    await page.click('#btn_submit')

    const boardHeader = await page.locator('h2.board-header')
    await expect(boardHeader).toContainText('Verify')
    await page.click('#btn_submit')

    const message = await page.locator('.alert-success')
    await expect(message).toContainText(
      'You successfully submitted your transaction'
    )
  })
})
