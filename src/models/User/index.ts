import bcrypt from "bcrypt";
import Errors from "./Errors";
import { validate as validateUUID } from "uuid";

class User {
  private id;
  private username;
  private passwordHash;

  constructor(id: string, username: string, password: string) {
    this.validateUser(id, username, password);
    this.createUser(id, username, password);
  }

  validateUser(id: string, username: string, password: string) {
    if (!id) {
      throw Errors.NO_EMPTY_ID;
    }

    if (!validateUUID(id)) {
      throw Errors.INVALID_ID;
    }

    if (!username) {
      throw Errors.NO_EMPTY_USERNAME;
    }

    if (!password) {
      throw Errors.NO_EMPTY_PASSWORD;
    }
  }

  getUser() {
    return {
      id: this.id,
      username: this.username,
    };
  }

  createUser(id: string, username: string, password: string) {
    this.id = id;
    this.username = username;
    this.passwordHash = this.encryptPassword(password);
  }

  encryptPassword(password: string) {
    const passwordHash = bcrypt.hashSync(password, 10);
    return passwordHash;
  }

  isValidUser(username: string, password: string) {
    if (username !== this.username) {
      return false;
    }

    const _isValidUser = bcrypt.compareSync(password, this.passwordHash);

    return _isValidUser;
  }
}

export default User;
