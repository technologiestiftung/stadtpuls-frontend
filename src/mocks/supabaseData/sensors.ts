import {
  mapPublicSensor,
  ParsedSensorType,
  SensorQueryResponseType,
} from "@lib/hooks/usePublicSensors";
import { getSensorRecords } from "./records";
import { categories } from "./categories";
import { userprofiles } from "./userprofiles";

export const ttnSensors: SensorQueryResponseType[] = [
  {
    id: 1,
    name: "Rindfleischetikettierungsüberwachungsaufgabenübertragungsgesetz",
    created_at: "2020-12-01T07:00:00",
    connection_type: "ttn",
    description:
      "Rindfleischetikettierungsüberwachungsaufgabenübertragungsgesetz Temperaturmessung den Räumlichkeiten der Technologiestiftung Berlin in der Grunewaldstraße",
    external_id: "ttn-device-id-123",
    category_id: 1,
    location: "Berlin",
    user_id: userprofiles[0].id,
    records: getSensorRecords({
      sensorId: 1,
      numberOfRecords: 209,
      firstRecordDate: "2020-12-01T08:00:00Z",
    }),
    latitude: 52.48864,
    longitude: 13.342667,
    altitude: 60,
    category: categories[0],
    user: userprofiles[0],
    icon_id: 1,
  },
  {
    id: 2,
    name: "ok",
    created_at: "2021-05-19T018:00:00",
    connection_type: "ttn",
    description:
      "Eine Boombox dröhnt im Park, die U1 quietscht über die Hochbahnstrecke und die Polizei rückt mal wieder mit Sirenen an: Eine typische Soundkulisse im Berliner Szenekiez. Klingt nicht sonderlich angenehm? Wir haben uns gefragt, welche Rolle Lärm für die Identität eines Kiezes spielt und welche Muster es gibt.",
    external_id: "ttn-device-id-456",
    category_id: 2,
    location: "Neubrandenburg",
    user_id: userprofiles[0].id,
    records: getSensorRecords({
      sensorId: 2,
      numberOfRecords: 708,
      firstRecordDate: "2021-05-19T19:00:00Z",
    }),
    latitude: 53.561847,
    longitude: 13.273557,
    altitude: 60,
    category: categories[1],
    user: userprofiles[0],
    icon_id: 4,
  },
  {
    id: 3,
    name: "Donaudampfschifffahrtsgesellschaftskapitän",
    created_at: "2021-08-25T011:00:00",
    connection_type: "ttn",
    external_id: "ttn-device-id-789",
    category_id: 2,
    location: "Hamburg",
    user_id: userprofiles[0].id,
    records: getSensorRecords({
      sensorId: 3,
      numberOfRecords: 190,
      firstRecordDate: "2021-08-25T12:00:00Z",
    }),
    latitude: 53.551681,
    longitude: 9.939079,
    altitude: 60,
    category: categories[1],
    user: userprofiles[0],
    icon_id: 19,
  },
];

export const httpSensors: SensorQueryResponseType[] = [
  {
    id: 4,
    name: "Betäubungsmittelverschreibungsverordnung",
    created_at: "2021-09-03T008:00:00",
    connection_type: "http",
    description:
      "Absolute Stille, das gibt es praktisch nur im Vakuum. Da, wo sich Schall ausbreiten kann, gibt es auch Geräusche und wo viele Menschen auf engem Raum leben, kann es schnell laut werden. Der akustische Puls der Stadt schlägt im Takt der Aktivität seiner Bewohner:innen und Besucher:innen und in Berlin kommt er selten zum Stillstand.",
    category_id: 3,
    location: "Düren",
    user_id: userprofiles[0].id,
    records: getSensorRecords({
      sensorId: 4,
      numberOfRecords: 5,
      firstRecordDate: "2021-09-03T09:00:00Z",
    }),
    latitude: 50.799519,
    longitude: 6.474333,
    altitude: 60,
    category: categories[2],
    user: userprofiles[0],
    icon_id: 3,
  },
  {
    id: 5,
    name: "Donaudampfschiffahrtselektrizitätenhauptbetriebswerkbauunterbeamtengesellschaft",
    created_at: "2021-09-12T022:00:00",
    connection_type: "http",
    description:
      "Offene Verwaltungsdaten helfen uns, die Lärmbelastung in Berlin zu verstehen und zu bewerten. Die strategischen Lärmkarten zeigen, wie sich der Lärm des Hauptverkehrsstraßennetzes und des Schienennetzes auswirkt und Erhebungen zur Verkehrslärmexposition zeigen, dass 12,3% der Berliner:innen einer gesundheitskritischen",
    category_id: 4,
    location: "Villingen-Schwenningen",
    user_id: userprofiles[0].id,
    records: getSensorRecords({
      sensorId: 5,
      numberOfRecords: 452,
      firstRecordDate: "2021-09-12T23:00:00Z",
    }),
    latitude: 48.05499,
    longitude: 8.459909,
    altitude: 60,
    category: categories[3],
    user: userprofiles[0],
    icon_id: 13,
  },
  {
    id: 6,
    name: "Simple Broadcast",
    created_at: "2021-09-15T020:00:00",
    connection_type: "http",
    description:
      "Wir wollten wissen: Wie wird die Lebensqualität im Kiez durch Lärm beeinflusst? Welche kleinräumigen und zeitlichen Muster gibt es in Kiezen? Gibt es Zeiten und Orte, die besonders laut oder leise sind?",
    category_id: 5,
    location: "München",
    user_id: userprofiles[0].id,
    records: [],
    latitude: 48.168577,
    longitude: 11.551248,
    altitude: 100,
    category: categories[4],
    user: userprofiles[0],
    icon_id: 16,
  },
];

export const sensors = [...httpSensors, ...ttnSensors];

export const parsedSensors: ParsedSensorType[] = sensors.map(mapPublicSensor);

export const curatedSensors: ParsedSensorType[] = parsedSensors.slice(0, 3);
