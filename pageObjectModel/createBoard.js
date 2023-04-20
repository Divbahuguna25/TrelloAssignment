import { test, expect } from "@playwright/test";
import { deleteBoard } from "./deleteBoard";
import { loginTrello } from "./loginTrello";

export class createBoard {
  constructor(page) {
    this.page = page;
    this.pageTitleLink = page.getByTestId("create-board-tile").locator("div");
    this.pageTitleName = page.getByTestId("create-board-title-input");
    this.submitBtn = page.getByTestId("create-board-submit-button");
    this.addCardTitle = page.getByPlaceholder("Enter a title for this card…");
    this.addList = page.getByRole("link", { name: " Add another list" });
    this.listTitle = page.getByPlaceholder("Enter list title…");
    this.addListCTA = page.getByRole("button", { name: "Add list" });
  }

  async createBoard() {
    await this.pageTitleLink.click();

    await this.pageTitleName.fill("TestBoardAutomation");

    await this.submitBtn.click();
  }

  async createList() {
    await this.createBoard();

    await this.addList.click();

    await this.listTitle.fill("List A");

    await this.addListCTA.click();

    await expect(
      this.page.locator("//textarea[@aria-label='List A']").first()
    ).toBeVisible();

    await this.listTitle.fill("List B");

    await this.addListCTA.click();

    await expect(
      this.page.locator("//textarea[@aria-label='List B']").first()
    ).toBeVisible();
  }
}
