import UserRepository from "./repositories/UserRepository";
import AuthRepository from "./repositories/AuthRepository";
import LoginRepository from "./repositories/LoginRepository";

interface repositoryObject {
  [name: string]: any;
}

const repositories: repositoryObject = {
  auth: AuthRepository,
  login: LoginRepository,
  users: UserRepository,
};

export const RepositoryFactory = {
  get: (name: string) => repositories[name],
};
