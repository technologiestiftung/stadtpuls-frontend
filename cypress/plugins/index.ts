import {
  openPool,
  closePool,
  getClient,
} from "@technologiestiftung/stadtpuls-test-utils";
/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

const POOL_URL = "postgresql://postgres:your-super-secret-and-long-postgres-password@localhost/postgres?statusColor=F8F8F8&enviroment=production&name=Local%20Stadtpuls%20Supabase%20DB&tLSMode=0&usePrivateKey=false&safeModeLevel=0&advancedSafeModeLevel=0&driverVersion=0"

// eslint-disable-next-line no-unused-vars
const pluginFile: Cypress.PluginConfig = (on) => {
  on('task', {
    async deleteUser(email: string) {
      await openPool(POOL_URL);
      const client = await getClient();
      const existingUsers = await client.query(
        `SELECT * FROM auth.users WHERE email = $1`,
        [email],
      );
      if (existingUsers.rows.length === 0) return null
      await client.query(
        `DELETE FROM auth.users WHERE email = $1`,
        [email],
      );
      await closePool();
      return null;
    },
  })
}

module.exports = pluginFile;
