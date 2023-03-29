import { test, expect } from "@playwright/test";
import { HomePage } from "../../page-objects/HomePage";
import { FeedBackPage } from "../../page-objects/FeedBackPage";

test.describe("Feedback Form", () => {
  let homePage: HomePage;
  let feedBackPage: FeedBackPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    feedBackPage = new FeedBackPage(page);
    await homePage.visit();
    await homePage.clickOnFeedbackLink();
  });

  // Reset feedback form
  test("Reset feedback form", async ({ page }) => {
    await feedBackPage.fillForm(
      "some name",
      "some email@email.com",
      "some subject",
      "some nice comment about the application"
    );
    await feedBackPage.resetForm();
    await feedBackPage.assertReset();
  });

  // Submit feedback form
  test("Submit feedback form", async ({ page }) => {
    await feedBackPage.fillForm(
      "some name",
      "some email@email.com",
      "some subject",
      "some nice comment about the application"
    );
    await feedBackPage.submitForm();
    await feedBackPage.feedBackFormSent();
  });
});
