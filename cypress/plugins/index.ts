import { definitions } from "@technologiestiftung/stadtpuls-supabase-definitions/generated";
import {
  openPool,
  closePool,
  getClient,
} from "@technologiestiftung/stadtpuls-test-utils";
import format from "pg-format";
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

type SensorType = Omit<definitions['sensors'], 'id'>;
type RecordType = Omit<definitions['records'], 'id'>;

// eslint-disable-next-line no-unused-vars
const pluginFile: Cypress.PluginConfig = (on) => {
  on('task', {
    async openPool() {
      try {
        await openPool(POOL_URL);
      } catch (err) {}
      return null;
    },

    async closePool() {
      try {
        await closePool();
      } catch (err) {}
      return null;
    },

    async deleteUser(email: string) {
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
      return null;
    },

    async createSensor(sensor: SensorType): Promise<definitions['sensors'][]> {
      const client = await getClient();
      const createSensorQuery = format(
        `INSERT INTO public.sensors (${Object.keys(sensor)}) VALUES %L`,
        [Object.values(sensor)],
      );
      await client.query(createSensorQuery);
      const newSensor = await client.query(
        `SELECT * FROM public.sensors WHERE name = $1`,
        [sensor.name],
      );
      return newSensor.rows[0];
    },

    async createRecords(records: RecordType[]): Promise<definitions['records'][]> {
      const client = await getClient();
      const createSensorQuery = format(
        `INSERT INTO public.records (recorded_at, measurements, sensor_id) VALUES %L`,
        records.map(r => [r.recorded_at, `{${r.measurements?.join(',')}}`, r.sensor_id]),
      );
      await client.query(createSensorQuery);
      const newRecords = await client.query(
        `SELECT * FROM public.records WHERE recorded_at IN (${records.map(r => `'${r.recorded_at}'`).join(',')})`,
      );
      return newRecords.rows;
    },

    async clearSensorRecords(sensorId: number): Promise<null> {
      const client = await getClient();
      const sensorRecords = await client.query(
        `SELECT * FROM public.records WHERE sensor_id = $1`,
        [sensorId],
      );
      if (sensorRecords.rows.length === 0) return null
      await client.query(
        `DELETE FROM public.records WHERE sensor_id = $1`,
        [sensorId],
      );
      return null;
    },
  })
}

module.exports = pluginFile;
