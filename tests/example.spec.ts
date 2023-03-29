import {test, expect} from '@playwright/test'

// test("Simple test",async ({page}) => {
//     await page.goto("https://en.wikipedia.org/wiki/Main_Page", {waitUntil:"domcontentloaded",timeout:5000});
//     const pageTitle = await page.locator("//span[contains(text(),'Welcome to ')]").;
//     console.log(pageTitle)
//     await expect(pageTitle).toContain("Welcome to")


// })

test("Login:", async ({page}) => {
    await page.goto("https://practicetestautomation.com/practice-test-login/");
    const userField = await page.locator("#username");
    const passwordField = await page.locator("#password");
    await userField.type("student")
    await passwordField.type("Password123")
    await page.click("#submit")
    const  logingMessage = await page.locator(".post-title").innerText()
    expect(logingMessage).toContain("Logged In Successfully")
})
test("Assertion", async ({page}) => {
    await page.goto("https://practicetestautomation.com/practice-test-login/");
    // const userField = await page.locator("#username");
    // const passwordField = await page.locator("#password");
    // await userField.type("student")
    // await passwordField.type("Password123")
    // await page.click("#submit")
    // const  logingMessage = await page.locator(".post-title").innerText()
    
    await expect(page).toHaveURL("https://practicetestautomation.com/practice-test-login/")
    await expect(page).toHaveTitle("Test Login | Practice Test Automation")
})