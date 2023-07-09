import { User } from "./models";
import { v4 as uuidv4 } from "uuid";

const userData = {
  id: uuidv4(),
  username: "felipe",
  password: "123456",
};

console.log("Criando usuário com os seguintes dados\n");
console.log(userData);

const user = new User(userData.id, userData.username, userData.password);

console.log("\nPegando dados do usuário criado (sem retornar o password)\n");
console.log(user.getUser());
