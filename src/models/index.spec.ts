import { User } from ".";

describe("Models", () => {
  test("Should import of User from models path", () => {
    expect(User).toBeTruthy();
    expect(User.length > 0).toBe(true);
  });
});
