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
import TagMasterRepository from "./repositories/TagMasterRepository";
import PostRepository from "./repositories/PostRepository";
import LatestPostsRepository from "./repositories/LatestPostsRepository";
import MyPostsRepository from "./repositories/MyPostsRepository";
import RankRepository from "./repositories/RankRepository";
import FollowingRepository from "./repositories/FollowingRepository";
import FollowerRepository from "./repositories/FollowerRepository";
import FollowRepository from "./repositories/FollowRepository";
import RemoveRepository from "./repositories/RemoveRepository";
import UserPostsRepository from "./repositories/UserPostsRepository";

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
  tagMaster: TagMasterRepository,
  post: PostRepository,
  latestPosts: LatestPostsRepository,
  myPosts: MyPostsRepository,
  rank: RankRepository,
  following: FollowingRepository,
  follower: FollowerRepository,
  follow: FollowRepository,
  remove: RemoveRepository,
  userPosts: UserPostsRepository,
};

export const RepositoryFactory = {
  get: (name: string) => repositories[name],
};
