import UserRepository from "./repositories/UserRepository";
import LoginRepository from "./repositories/LoginRepository";
import LogoutRepository from "./repositories/LogoutRepository";

interface repositoryObject {
  [name: string]: any;
}

const repositories: repositoryObject = {
  logout: LogoutRepository,
  login: LoginRepository,
  users: UserRepository,
};

export const RepositoryFactory = {
  get: (name: string) => repositories[name],
};
