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
