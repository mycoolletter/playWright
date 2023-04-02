import { test, expect } from '@playwright/test'
import { Navbar } from '../../page-objects/components/NavBar';
import {HomePage} from '../../page-objects/HomePage'
import {LoginPage} from '../../page-objects/LoginPage'
import { Tab } from '../../utils/constants';

test.describe('New Payment', () => {
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

  test('Should send new payment', async ({ page }) => {
    await navbar.clickOnTab(Tab.PayBills);
    await page.selectOption('#sp_payee', 'apple')
    await page.click('#sp_get_payee_details')
    await page.waitForSelector('#sp_payee_details')
    await page.selectOption('#sp_account', '6')
    await page.type('#sp_amount', '5000')
    await page.type('#sp_date', '2021-11-09')
    await page.type('#sp_description', 'some random message')
    await page.click('#pay_saved_payees')

    const message = await page.locator('#alert_content > span')
    await expect(message).toBeVisible()
    await expect(message).toContainText(
      'The payment was successfully submitted'
    )
  })
})
