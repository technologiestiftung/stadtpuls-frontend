// load type definitions that come with Cypress module
/// <reference types="cypress" />
import { definitions } from "@technologiestiftung/stadtpuls-supabase-definitions";
import "./commands";
import inViewport from "./inViewport";

export interface CurrentSessionType {
  access_token: string;
  user: definitions['user_profiles'];
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
       * Deleted the default user used to signin
       * @example cy.deleteSigninUser()
       */
      deleteSigninUser(): Chainable<Element>;

      /**
       * Deletes the user of the corresponding token
       * @example cy.deleteUser('token')
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
        Cypress.Response<CurrentSessionType>
      >;

      /**
       * Retrieves a sensor's data
       * @example cy.getSensor(4)
       */
      getSensor(id: definitions['sensors']['id']): Chainable<
        Cypress.Response<definitions['sensors'][]>
      >;

      /**
       * Retrieves a sensor by name
       * @example cy.getSensorByName("My Sensor")
       */
      getSensorByName(name: definitions['sensors']['name']): Chainable<
        Cypress.Response<definitions['sensors'][]>
      >;

      /**
       * Retrieves all the sensors
       * @example cy.getAllSensors()
       */
      getAllSensors(): Chainable<
        Cypress.Response<definitions['sensors'][]>
      >;

      /**
       * Retrieves a sensor's records
       * @example cy.getSensorRecords(4)
       */
      getSensorRecords(sensorId: definitions['sensors']['id']): Chainable<
        Cypress.Response<definitions['records'][]>
      >;

      /**
       * Creates records for a give sensor
       * @example cy.createSensorRecords(4)
       */
      createSensorRecord(sensorId: definitions['sensors']['id']): Chainable<
        Cypress.Response<definitions['records']>
      >;

      /**
       * Creates a sensor and retrived its id
       * @example cy.createSensor({ name: "Test Sensor", ... }).then(id => { ... })
       */
      createSensor(sensor: Omit<definitions['sensors'], 'id' | 'user_id'>): Chainable<
        Cypress.Response<undefined>
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
