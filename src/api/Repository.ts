import axios from "axios";

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
      apiRepository.post(resource, {
        name: argName,
        email: argEmail,
        password: argPassword,
      });
      // 登録後ログイン
      repository.get("sanctum/csrf-cookie");
      return apiRepository.post("login", {
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
    show(id: number) {
      return apiRepository.get(`${resource}/${id}`);
    },
    post(payload: any) {
      return apiRepository.post(resource, payload);
    },
    delete(id: number) {
      return apiRepository.delete(`${resource}/${id}`);
    },
  };
};
