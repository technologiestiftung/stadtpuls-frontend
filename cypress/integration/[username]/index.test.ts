import { AuthRelevantSessionData, getSession } from "../../utils/getSession";

let session: AuthRelevantSessionData;

before(() => {
  getSession({
    email: Cypress.env("email"),
    password: Cypress.env("password"),
  }).then(res => {
    session = res;
  });
});

beforeEach(() => {
  cy.visit(`${Cypress.env("username")}/sensors`, {
    onBeforeLoad: contentWindow => {
      contentWindow.localStorage.setItem(
        "supabase.auth.token",
        JSON.stringify(session)
      );
    },
  });
});

describe("The authenticated user account page", () => {
  it("displays the elements that only the authenticated user can see", () => {
    cy.findByRole("heading", {
      level: 1,
      name: new RegExp(`${Cypress.env("display_name")}`, "i"),
    });

    cy.findByRole("button", {
      name: "Account editieren",
    });

    cy.findByRole("link", {
      name: "Deine Tokens",
    });
    cy.findByRole("button", {
      name: "Neuer Sensor",
    });
  });
});
