import {test, expect} from '@playwright/test';
test.describe.parallel("Loggin/Logout flow",()=>{

test.beforeEach(async ({page})=>{
await page.goto("https://practicetestautomation.com/practice-test-login/")
})
//Negative scenario
test("Negative userName test", async({page})=>{
await page.locator("#username").fill("admin");
await page.locator("#password").fill("Password123");
await page.locator("#submit").click();

const errorPopUp = await page.locator('#error');

await expect(errorPopUp).toBeVisible();
await expect(await errorPopUp.innerText()).toContain("Your username is invalid!")
})
test.only("Negative Password test", async({page})=>{
    await page.locator("#username").fill("student");
    await page.locator("#password").fill("Password13");
    await page.locator("#submit").click();
    
    const errorPopUp = await page.locator('#error');

    await expect(errorPopUp).toBeVisible();
    await expect(await errorPopUp.innerText()).toContain("Your password is invalid!")
    })
//Possitive scenario
test("Positive LogIn test", async({page})=>{
    await page.type("#username","student");
    await page.type("#password","Password123");
    await page.click("#submit");
    
    const postTitle = await page.locator('.post-title');
    
    await expect(postTitle).toBeVisible();
    await expect(await postTitle.innerText()).toEqual("Logged In Successfully");
    await expect(await page.locator('//a[text()="Log out"]')).toBeVisible();
    })
})