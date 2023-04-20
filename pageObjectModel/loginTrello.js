import { test, expect } from "@playwright/test";

export class loginTrello {
  constructor(page) {
    this.page = page;
    this.loginNav = page
      .getByTestId("bignav")
      .getByRole("link", { name: "Log in" });
    this.email = page.getByPlaceholder("Enter email");
    this.continueCta = page.getByRole("button", { name: "Continue" });
    this.passwordCta = page.getByPlaceholder("Enter password");
    this.loginCta = page.getByRole("button", { name: "Log in" });
  }


  //this is a common method that is being used for login into my trello account
  async login() {
    await this.page.goto(process.env.BASE_URL);

    await this.loginNav.click();

    await this.email.fill(process.env.email);

    await this.continueCta.click();

    await this.passwordCta.fill(process.env.password);

    await this.loginCta.click();
  }
}
