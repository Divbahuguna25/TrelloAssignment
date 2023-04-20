import { test, expect } from "@playwright/test";

export class deleteBoard {
  constructor(page) {
    this.page = page;
    this.sideMenu = page.getByRole("button", { name: "Show menu" });
    this.moreLink = page.getByRole("link", { name: " More" });
    this.closeBoard = page.getByRole("link", { name: "Close board…" });
    this.closeCta = page.getByRole("button", {
      name: "Close",
    });
    this.deleteBoard = page.getByTestId("close-board-delete-board-button");
    this.confirmDelete = page.getByTestId(
      "close-board-delete-board-confirm-button"
    );
  }

  //this method is used to delete board after every testcase

  async delete() {
    await this.sideMenu.click();

    await this.moreLink.click();

    await this.closeBoard.click();

    await this.closeCta.click();

    await this.deleteBoard.click();

    await this.confirmDelete.click();
  }
}
