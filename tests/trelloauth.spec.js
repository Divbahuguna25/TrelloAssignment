import { test, expect } from "@playwright/test";
import { loginTrello } from "../pageObjectModel/loginTrello";

test("user sucessfully logs in", async ({ page }) => {
  const loginTrelloMethod = new loginTrello(page);

  await loginTrelloMethod.login();
});

test("user sucessfully logs out", async ({ page }) => {
  const loginTrelloMethod = new loginTrello(page);

  await loginTrelloMethod.loggedOut();
});
