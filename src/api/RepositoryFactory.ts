import UserRepository from "./repositories/UserRepository";
import LoginRepository from "./repositories/LoginRepository";
import LogoutRepository from "./repositories/LogoutRepository";
import RegisterRepository from "./repositories/RegisterRepository";
import UsersRepository from "./repositories/UsersRepository";
import GuestPostsRepository from "./repositories/GuestPostsRepository";
import ProjectsRepository from "./repositories/ProjectsRepository";
import FaqRepository from "./repositories/FaqRepository";

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
  faq: FaqRepository,
};

export const RepositoryFactory = {
  get: (name: string) => repositories[name],
};
