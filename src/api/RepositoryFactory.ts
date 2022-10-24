import UserRepository from "./repositories/UserRepository";
import LoginRepository from "./repositories/LoginRepository";

interface repositoryObject {
  [name: string]: any;
}

const repositories: repositoryObject = {
  login: LoginRepository,
  users: UserRepository,
};

export const RepositoryFactory = {
  get: (name: string) => repositories[name],
};
