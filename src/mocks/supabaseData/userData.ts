export const fakeUserData = { name: "John Doe" };

export const fakeRefreshToken = {
  access_token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNjE4OTk5MzA3LCJzdWIiOiJmZGYyOTVlNC01YzEwLTQwZTItODM0OC1kOWYzMmEzZjRkY2EiLCJlbWFpbCI6ImpvaG5kb2VAZ21haWwuY29tIiwiYXBwX21ldGFkYXRhIjp7InByb3ZpZGVyIjoiZW1haWwifSwidXNlcl9tZXRhZGF0YSI6eyJlbWFpbCI6ImpvaG5kb2VAZ21haWwuY29tIn0sInJvbGUiOiJhdXRoZW50aWNhdGVkIn0.Fo_7Yw2hfE0k9usUebxEiTrFjedSniw8p1Ul2m_FzGE",
  token_type: "bearer",
  expires_in: 3600,
  refresh_token: "UjgV0hV2FRcU4cnJVJUxoQ",
  user: {
    id: "fdf295e4-5c10-40e2-8348-d9f32a3f4dca",
    aud: "authenticated",
    role: "authenticated",
    email: "johndoe@gmail.com",
    confirmed_at: "2021-04-20T08:18:04.847499Z",
    confirmation_sent_at: "2021-04-20T08:17:53.314909Z",
    recovery_sent_at: "2021-04-21T13:15:50.232467Z",
    last_sign_in_at: "2021-04-21T13:16:00.694972Z",
    app_metadata: { provider: "email" },
    user_metadata: { email: "johndoe@gmail.com" },
    created_at: "2021-04-20T08:17:53.312957Z",
    updated_at: "2021-04-21T17:27:59.062922Z",
  },
};

export const fakeAuthToken = {
  currentSession: {
    provider_token: null,
    access_token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNjE4OTk5MzA3LCJzdWIiOiJmZGYyOTVlNC01YzEwLTQwZTItODM0OC1kOWYzMmEzZjRkY2EiLCJlbWFpbCI6ImpvaG5kb2VAZ21haWwuY29tIiwiYXBwX21ldGFkYXRhIjp7InByb3ZpZGVyIjoiZW1haWwifSwidXNlcl9tZXRhZGF0YSI6eyJlbWFpbCI6ImpvaG5kb2VAZ21haWwuY29tIn0sInJvbGUiOiJhdXRoZW50aWNhdGVkIn0.Fo_7Yw2hfE0k9usUebxEiTrFjedSniw8p1Ul2m_FzGE",
    expires_in: 3600,
    expires_at: 1618999308,
    refresh_token: "eGHcr7BfvcDar6_ZCetsgQ",
    token_type: "bearer",
    user: {
      id: "fdf295e4-5c10-40e2-8348-d9f32a3f4dca",
      aud: "authenticated",
      role: "authenticated",
      email: "johndoe@gmail.com",
      confirmed_at: "2021-04-20T08:18:04.847499Z",
      confirmation_sent_at: "2021-04-20T08:17:53.314909Z",
      recovery_sent_at: "2021-04-21T09:01:32.312811Z",
      last_sign_in_at: "2021-04-21T09:01:47.469596Z",
      app_metadata: {
        provider: "email",
      },
      user_metadata: {
        email: "johndoe@gmail.com",
      },
      created_at: "2021-04-20T08:17:53.312957Z",
      updated_at: "2021-04-20T08:17:53.312963Z",
    },
  },
  expiresAt: 1618999308,
};

export const fakeUserProjects = [
  {
    id: 1,
    name: "Project 1",
    description: "Description",
    connectype: "ttn",
    location: "Somewhere",
    category: { id: 1, name: "CO2", description: "foo" },
    devices: [
      { id: 0, externalId: "PtI4UomLZ0cXDSzlZn8S", name: "Device 1" },
      { id: 1, externalId: "USpYF2HgmxCYez1Iu23l", name: "Device 2" },
      { id: 2, externalId: "pmaTb8pUlcTBeJ2PZ4wo", name: "Device 3" },
    ],
  },
  {
    id: 2,
    name: "Project 2",
    description: "Description",
    connectype: "ttn",
    location: "Nowhere",
    category: { id: 2, name: "Temperatur", description: "foo" },
    devices: [
      { id: 3, externalId: "oMtbFeskmjqONlCgeD0L", name: "Device 1" },
      { id: 4, externalId: "yFb3AmS4neirQj1zFGiQ", name: "Device 2" },
      { id: 5, externalId: "ZdkyW34ynX3ZlzTrmVaV", name: "Device 3" },
    ],
  },
  {
    id: 3,
    name: "Project 3",
    description: "Description",
    connectype: "ttn",
    location: "Anywhere",
    category: { id: 3, name: "Luftfeuchtigkeit", description: "foo" },
    devices: [
      { id: 6, externalId: "f6gF6eWtfGxKh2I4Ezqb", name: "Device 1" },
      { id: 7, externalId: "onqlsQaQxGO4kXsrz4wg", name: "Device 2" },
      { id: 8, externalId: "okqBFVbHxS74IszBX5cS", name: "Device 3" },
    ],
  },
  {
    id: 4,
    name: "Project 4",
    description: "Description",
    connectype: "ttn",
    location: "Everywhere",
    category: { id: 4, name: "Druck", description: "foo" },
    devices: [
      { id: 9, externalId: "pXTZqfqhIxt6ACEuStAm", name: "Device 1" },
      { id: 10, externalId: "pEIwi6D4Vfg46n97JgWU", name: "Device 2" },
      { id: 11, externalId: "7THmWkbo7PQjdWgQiRpr", name: "Device 3" },
    ],
  },
];
