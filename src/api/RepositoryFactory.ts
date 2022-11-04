import UserRepository from "./repositories/UserRepository";
import LoginRepository from "./repositories/LoginRepository";
import LogoutRepository from "./repositories/LogoutRepository";
import RegisterRepository from "./repositories/RegisterRepository";
import UsersRepository from "./repositories/UsersRepository";
import GuestPostsRepository from "./repositories/GuestPostsRepository";
import ProjectsRepository from "./repositories/ProjectsRepository";
import FaqRepository from "./repositories/FaqRepository";
import AdsRepository from "./repositories/AdsRepository";
import FavoriteRepository from "./repositories/FavoriteRepository";
import FavoriteRemoveRepository from "./repositories/FavoriteRemoveRepository";
import FavoriteListRepository from "./repositories/FavoriteListRepository";
import NameEditRepository from "./repositories/NameEditRepository";

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
  ads: AdsRepository,
  favorite: FavoriteRepository,
  favoriteRemove: FavoriteRemoveRepository,
  favoriteList: FavoriteListRepository,
  nameEdit: NameEditRepository,
};

export const RepositoryFactory = {
  get: (name: string) => repositories[name],
};
