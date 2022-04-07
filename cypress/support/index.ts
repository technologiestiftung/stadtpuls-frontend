// load type definitions that come with Cypress module
/// <reference types="cypress" />
import "./commands";
import inViewport from "./inViewport";

export interface CurrentSessionType {
  access_token: string;
  [key: string]: unknown;
}

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Signs up the test user defined in cypress.json
       * @example cy.signUp()
       */
      signUp(): Chainable<Element>;

      /**
       * Deletes the user of the corresponding token
       * @example cy.deleteUser()
       */
      deleteUser(token: string): Chainable<Element>;

      /**
       * Signs in the test user by saving the session from getSession to localStorage
       * @example cy.signUp()
       */
      signIn(): Chainable<Element>;

      /**
       * Retrieves a session with token etc.
       * @example cy.getSession()
       */
      getSession(): Chainable<
        Cypress.Response<{
          body: {
            currentSession: CurrentSessionType;
            expiresAt: number;
          };
          [key: string]: unknown;
        }>
      >;
    }
  }
}

before(() => {
  chai.use(inViewport);
});

const resizeObserverLoopErrRe = /^[^(ResizeObserver loop limit exceeded)]/;
Cypress.on("uncaught:exception", err => {
  /* returning false here prevents Cypress from failing the test */
  if (resizeObserverLoopErrRe.test(err.message)) {
    return false;
  }
});
