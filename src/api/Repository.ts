import axios from "axios";
import { CreatePostEntity } from "./entities/request/CreatePostEntity";
import { ProjectDetailEntity } from "./entities/response/ProjectDetailEntity";
import { UsersEntity } from "./entities/response/UsersEntity";

// fqdn
const fqdn: string | undefined = process.env.REACT_APP_API_FQDN;

const repository = axios.create({
  baseURL: fqdn,
  withCredentials: true,
});

const apiRepository = axios.create({
  baseURL: fqdn + "/api",
  withCredentials: true,
});

export default (resource: string) => {
  return {
    index() {
      return apiRepository.get(resource);
    },
    // 登録処理
    register(argName: string, argEmail: string, argPassword: string) {
      return apiRepository.post(resource, {
        name: argName,
        email: argEmail,
        password: argPassword,
      });
    },
    // ログイン
    login(argEmail: string, argPassword: string) {
      repository.get("sanctum/csrf-cookie");
      return apiRepository.post(resource, {
        email: argEmail,
        password: argPassword,
      });
    },
    // プロジェクト詳細取得
    postDetail(postId: string) {
      return apiRepository.get<ProjectDetailEntity>(resource, {
        params: {
          postId: postId,
        },
      });
    },
    // プロジェクトのお気に入り登録・解除
    favorite(postId: string) {
      return apiRepository.post(resource, {
        postId: postId,
      });
    },
    update(name: string) {
      return apiRepository.post(resource, {
        name: name,
      });
    },
    postProject(postData: CreatePostEntity) {
      return apiRepository.post(resource, { postData });
    },
    // プロジェクト一覧取得(ページ番号)
    paginationProjects(page: number) {
      return apiRepository.get(resource, {
        params: {
          page: page,
        },
      });
    },
    // ユーザー一覧取得(ページ番号)
    users(page: number) {
      return apiRepository.get<UsersEntity[]>(resource, {
        params: {
          page: page,
        },
      });
    },
    // ユーザー情報・投稿一覧取得(ページ番号)
    userPosts(userId: number, page: number) {
      return apiRepository.get(resource, {
        params: {
          userId: userId,
          page: page,
        },
      });
    },
    // フォロー処理
    follow(userId: string) {
      return apiRepository.post(resource, {
        userId: userId,
      });
    },
  };
};
