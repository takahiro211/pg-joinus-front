import UserRepository from "./repositories/UserRepository";
import LoginRepository from "./repositories/LoginRepository";
import LogoutRepository from "./repositories/LogoutRepository";
import RegisterRepository from "./repositories/RegisterRepository";
import UsersRepository from "./repositories/UsersRepository";
import GuestPostsRepository from "./repositories/GuestPostsRepository";
import ProjectsRepository from "./repositories/ProjectsRepository";

interface repositoryObject {
  [name: string]: any;
}

const repositories: repositoryObject = {
  register: RegisterRepository,
  logout: LogoutRepository,
  login: LoginRepository,
  user: UserRepository,
  users: UsersRepository,
  guestPosts: GuestPostsRepository,
  projects: ProjectsRepository,
};

export const RepositoryFactory = {
  get: (name: string) => repositories[name],
};
