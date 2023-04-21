import { test, expect } from "@playwright/test";
import { loginTrello } from "../pageObjectModel/loginTrello";
import { createBoard } from "../pageObjectModel/createBoard";
import { deleteBoard } from "../pageObjectModel/deleteBoard";

test.describe.configure({ mode: "serial" });

test("create a card in List A", async ({ page }) => {
  const createBoardMethod = new createBoard(page);

  const deleteBoardMethod = new deleteBoard(page);

  await createBoardMethod.createCard("List A");

  await deleteBoardMethod.delete();
});
test("create a card in List A and move it to B", async ({ page }) => {
  const createBoardMethod = new createBoard(page);

  const deleteBoardMethod = new deleteBoard(page);

  await createBoardMethod.moveCard("List B");

  await deleteBoardMethod.delete();
});

test.beforeEach(async ({ page }) => {
  const loginTrelloMethod = new loginTrello(page);

  await loginTrelloMethod.login();
});
