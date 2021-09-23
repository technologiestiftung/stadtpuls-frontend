import { AccountQueryResponseType } from "@lib/hooks/usePublicAccounts";
import { ttnSensors, httpSensors } from "./sensors";
import { userprofiles } from "./userprofiles";

export const publicAccounts: AccountQueryResponseType[] = [
  {
    id: "1",
    name: "vogelino",
    display_name: "Lucas Vogel",
    created_at: "2021-09-16T12:27:17.934324+00:00",
    description: "The dude with the arms",
    url: "https://api.github.com/users/vogelino",
    sensors: httpSensors,
    user: userprofiles[0],
  },
  {
    id: "2",
    name: "dnsos",
    display_name: "Dennis",
    created_at: "2021-01-07T18:20:10.934324+00:00",
    description: "The dude with the nose",
    url: "https://api.github.com/users/dnsos",
    sensors: ttnSensors,
    user: userprofiles[0],
  },
  {
    id: "3",
    name: "ff6347",
    display_name: "Fabian",
    created_at: "2020-04-018T18:20:10.934324+00:00",
    description: "The dude with the ear",
    url: "https://api.github.com/users/ff6347",
    sensors: [...ttnSensors, ...httpSensors],
    user: userprofiles[0],
  },
];
