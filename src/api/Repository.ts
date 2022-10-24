import axios from "axios";

const repository = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true,
});

export default (resource: string) => {
  return {
    index() {
      return repository.get(resource);
    },
    login(argEmail: string, argPassword: string) {
      repository.get("sanctum/csrf-cookie");
      return repository.post(resource, {
        email: argEmail,
        password: argPassword,
      });
    },
    show(id: number) {
      return repository.get(`${resource}/${id}`);
    },
    post(payload: any) {
      return repository.post(resource, payload);
    },
    delete(id: number) {
      return repository.delete(`${resource}/${id}`);
    },
  };
};
