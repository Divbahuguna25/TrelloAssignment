import { test, expect } from "@playwright/test";
import { deleteBoard } from "./deleteBoard";
import { loginTrello } from "./loginTrello";

export class createBoard {
  constructor(page) {
    this.page = page;
    this.pageTitleLink = page.getByTestId("create-board-tile").locator("div");
    this.pageTitleName = page.getByTestId("create-board-title-input");
    this.submitBtn = page.getByTestId("create-board-submit-button");
    this.board = page.locator("#board");
    this.addCardTitle = page.getByPlaceholder("Enter a title for this card…");
    this.addList = page.getByRole("link", { name: " Add another list" });
    this.listTitle = page.getByPlaceholder("Enter list title…");
    this.addListCTA = page.getByRole("button", { name: "Add list" });
    this.addCard = page.getByRole("link", { name: " Add a card" }).nth(3);
    this.addCardCTA = page.locator("//input[@value='Add card']");
    this.cardTitle = page.getByPlaceholder("Enter a title for this card…");
    this.listOfCards = page.locator("a.open-card-composer");
  }

  //this is a common method for creating workspace/board
  async createBoard() {
    await this.pageTitleLink.click();

    await this.pageTitleName.fill("TestBoardAutomation");

    await this.submitBtn.click();

    await expect(this.board).toBeVisible();
  }

  //this is a commond method for creating List A and List B in the board
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

  //this isa method for creating a card inside List A
  async createCard(listName) {
    await this.createList();

    let cardsList = await this.listOfCards;

    for (let i = 0; i <= (await cardsList.count()) - 1; i++) {
      let cardsHeading = await this.page
        .locator("div.list.js-list-content h2")
        .nth(i)
        .innerText();

      if (await cardsHeading.includes(listName)) {
        await this.listOfCards.nth(i).click();

        await this.cardTitle.fill("Card A");

        await this.addCardCTA.click();

        await expect(this.page.locator("span.list-card-title")).toBeVisible();

        break;
      }
    }
  }

  //this is a method where we are moving the card from List A to List B and checkin the new coordinates
  async moveCard(listName) {
    await this.createCard("List A");

    const cardLocation = await this.page
      .locator("div.list-card-details.js-card-details")
      .boundingBox();

    console.log(cardLocation);

    let cardsList = await this.listOfCards;

    for (let j = 0; j <= (await cardsList.count()) - 1; j++) {
      let cardsHeading = await this.page
        .locator("div.list.js-list-content h2")
        .nth(j)
        .innerText();

      if (await cardsHeading.includes(listName)) {
        const newPos = await this.listOfCards.nth(j).boundingBox();

        console.log(newPos);

        await this.page.mouse.move(cardLocation.x, cardLocation.y);

        await this.page.mouse.down();

        await this.page.mouse.move(newPos.x, newPos.y);

        await this.page.mouse.down();

        await this.page.waitForTimeout(3000);

        if (
          (await newPos.x) === cardLocation.x &&
          newPos.y === cardLocation.y
        ) {
          await this.page
            .locator("div.list-card-details.js-card-details")
            .click();
        } else {
          console.log("Divyansh");
          console.log("the new position for x coordinate is" + newPos.x);

          console.log("the new position for y coordinate is" + newPos.y);

          break;
        }
      }
    }
  }
}
