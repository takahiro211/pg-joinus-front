import axios from "axios";

const apiRepository = axios.create({
  baseURL: "https://api.v2.ytmemo.com/api",
  withCredentials: true,
});

const repository = axios.create({
  baseURL: "https://api.v2.ytmemo.com",
  withCredentials: true,
});

export default (resource: string) => {
  return {
    index() {
      return apiRepository.get(resource);
    },
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
