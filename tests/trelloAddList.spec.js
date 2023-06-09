import { test, expect } from "@playwright/test";
import { loginTrello } from "../pageObjectModel/loginTrello";
import { createBoard } from "../pageObjectModel/createBoard";
import { deleteBoard } from "../pageObjectModel/deleteBoard";

test.describe.configure({ mode: "serial" });

test("create a board in Trello", async ({ page }) => {
  const createBoardMethod = new createBoard(page);

  const deleteBoardMethod = new deleteBoard(page);

  await createBoardMethod.createBoard();

  await deleteBoardMethod.delete();
});

test("create a list in Trello", async ({ page }) => {
  const createBoardMethod = new createBoard(page);

  const deleteBoardMethod = new deleteBoard(page);

  await createBoardMethod.createList();

  await deleteBoardMethod.delete();
});

test.beforeEach(async ({ page }) => {
  const loginTrelloMethod = new loginTrello(page);

  await loginTrelloMethod.login();
});
