import { programaticUserDelete, programaticSignup } from ".";

const testUser = {
  email: "test@email.com",
  password: "password",
};

describe("programaticSignup and delete", () => {
  test("should return a session with access_token", async () => {
    const session = await programaticSignup(testUser);

    expect(session?.access_token).toBeDefined();

    await programaticUserDelete(session);
  });
});
