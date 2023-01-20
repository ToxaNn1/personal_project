import { axiosBaseInstance } from "@/api/axios-base";

export class Api {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  #getUrl(url) {
    return `${url}`;
  }

  post(url, data, config) {
    return axiosBaseInstance.post(this.#getUrl(url), data, config);
  }

  put(url, data, config) {
    return axiosBaseInstance.put(this.#getUrl(url), data, config);
  }

  patch(url, data, config) {
    return axiosBaseInstance.patch(this.#getUrl(url), data, config);
  }

  get(url, config) {
    return axiosBaseInstance.get(this.#getUrl(url), config);
  }

  delete(url, config) {
    return axiosBaseInstance.delete(this.#getUrl(url), config);
  }
}
