import User from ".";
import Errors from "./Errors";
import { v4 as uuidv4 } from "uuid";

describe("User", () => {
  test("Should create an User if all params are correct", () => {
    const user = new User(uuidv4(), "felipe", "senha123!");

    expect(user).toBeDefined();
  });

  test("Should throw an error if id is not uuid", () => {
    expect(() => {
      new User("12345", "felipe", "senha123!");
    }).toThrow(Errors.INVALID_ID);
  });

  test("Should throw an error if id is empty", () => {
    expect(() => {
      new User("", "felipe", "senha123!");
    }).toThrow(Errors.NO_EMPTY_ID);
  });

  test("Should throw an error if username is empty", () => {
    expect(() => {
      new User(uuidv4(), "", "senha123!");
    }).toThrow(Errors.NO_EMPTY_USERNAME);
  });

  test("Should throw an error if password is empty", () => {
    expect(() => {
      new User(uuidv4(), "felipe", "");
    }).toThrow(Errors.NO_EMPTY_PASSWORD);
  });

  test("Should isValidUser return true if username and password are correct", () => {
    const user = new User(uuidv4(), "felipe", "senha123!");
    const isValidUser = user.isValidUser("felipe", "senha123!");

    expect(isValidUser).toBe(true);
  });

  test("Should isValidUser return false if username is incorrect", () => {
    const user = new User(uuidv4(), "felipe", "senha123!");
    const isValidUser = user.isValidUser("wrong_username", "senha123!");

    expect(isValidUser).toBe(false);
  });

  test("Should isValidUser return false if password is incorrect", () => {
    const user = new User(uuidv4(), "felipe", "senha123!");
    const isValidUser = user.isValidUser("felipe", "wrong_password");

    expect(isValidUser).toBe(false);
  });

  test("Should isValidUser return false if username and password are incorrect", () => {
    const user = new User(uuidv4(), "felipe", "senha123!");
    const isValidUser = user.isValidUser("wrong_username", "wrong_password");

    expect(isValidUser).toBe(false);
  });

  test("Should getUser return correct user data", () => {
    const id = uuidv4();
    const username = "felipe";

    const user = new User(id, username, "senha123!");

    const responseUser = user.getUser();

    expect(responseUser.id).toBe(id);
    expect(responseUser.username).toBe(username);
  });
});
