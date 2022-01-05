import { definitions } from "@technologiestiftung/stadtpuls-supabase-definitions";
import { mapPublicAccount } from "@lib/hooks/usePublicAccounts";

export const userProfiles: definitions["user_profiles"][] = [
  {
    id: "adf295d4-5c12-40e2-8398-d9f32a3f4aca",
    name: "vogelino",
    display_name: "Lucas Vogel",
    created_at: "2021-09-16T12:27:17.934324+00:00",
    description: "The dude with the arms",
    url: "https://api.github.com/users/vogelino",
  },
  {
    id: "abf295e4-5c14-40e2-8348-d0f32a3f2dfe",
    name: "dennis",
    display_name: "Dennis",
    created_at: "2021-01-07T18:20:10.934324+00:00",
    description: "The dude with the nose",
    url: "https://api.github.com/users/dnsos",
  },
  {
    id: "cef292e4-5c10-49e2-8348-d9a32a3f4dad",
    name: "ff6347",
    display_name: "Fabian",
    created_at: "2020-04-018T18:20:10.934324+00:00",
    description: "The dude with the ear",
    url: "https://api.github.com/users/ff6347",
  },
  {
    id: "bbf292e5-5c10-19e2-8348-d9e36a3f9dcc",
    name: "XXDennis",
    display_name: "Dennis 2",
    created_at: "2021-01-13T18:20:10.934324+00:00",
    description: "The dude with the nose 2",
    url: "https://api.github.com/users/dnsos",
  },
];

export const extendedUserProfiles: definitions["extended_user_profiles"][] = [
  // Differs from userProfiles in this way:
  // - already sorted (DB view handles that)
  // - different column names (provided by DB view)
  // - added sensors_count, records_count, categories, and sensors
  {
    id: "2",
    username: "dennis",
    display_name: "Dennis",
    created_at: "2021-01-07T18:20:10.934324+00:00",
    description: "The dude with the nose",
    link: "https://api.github.com/users/dnsos",
    categories: [2, 3],
    sensors_count: 2,
    records_count: 471,
    sensors: [6, 101],
  },
  {
    id: "3",
    username: "ff6347",
    display_name: "Fabian",
    created_at: "2020-04-018T18:20:10.934324+00:00",
    description: "The dude with the ear",
    link: "https://api.github.com/users/ff6347",
    categories: [1, 3, 4, 5],
    sensors_count: 5,
    records_count: 13023,
    sensors: [3, 38, 67, 90, 112],
  },
  {
    id: "1",
    username: "vogelino",
    display_name: "Lucas Vogel",
    created_at: "2021-09-16T12:27:17.934324+00:00",
    description: "The dude with the arms",
    link: "https://api.github.com/users/vogelino",
    categories: [1, 2, 3],
    sensors_count: 3,
    records_count: 5981,
    sensors: [12, 29, 45],
  },
  {
    id: "4",
    username: "XXDennis",
    display_name: "Dennis 2",
    created_at: "2021-01-13T18:20:10.934324+00:00",
    description: "The dude with the nose 2",
    link: "https://api.github.com/users/dnsos",
    categories: [],
    sensors_count: 0,
    records_count: 0,
    sensors: [],
  },
];

export const parsedAccounts = extendedUserProfiles.map(mapPublicAccount);
