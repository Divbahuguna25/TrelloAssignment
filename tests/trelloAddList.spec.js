import { test, expect } from "@playwright/test";
import { loginTrello } from "../pageObjectModel/loginTrello";
import { createBoard } from "../pageObjectModel/createBoard";
import { deleteBoard } from "../pageObjectModel/deleteBoard";

test.describe("adding testcases for creating list", () => {
  test("create a board in Trello", async ({ page }) => {
    const createBoardMethod = new createBoard(page);

    await createBoardMethod.createBoard();

    const deleteBoardMethod = new deleteBoard(page);

    await deleteBoardMethod.delete();
  });

  test("create a list in Trello", async ({ page }) => {
    const createBoardMethod = new createBoard(page);

    await createBoardMethod.createList();

    const deleteBoardMethod = new deleteBoard(page);

    await deleteBoardMethod.delete();
  });
});

test.beforeEach(async ({ page }) => {
  const loginTrelloMethod = new loginTrello(page);

  await loginTrelloMethod.login();
});
