import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import { useHistory } from "react-router-dom";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/",
});
const ResponseInterceptor = (response: AxiosResponse) => {
  return response;
};
const RequestInterceptor = (config: AxiosRequestConfig) => {
  config.headers.Authorization =
    "Bearer " + localStorage.getItem("access_token");
  return config;
};
axiosInstance.interceptors.request.use(RequestInterceptor);
axiosInstance.interceptors.response.use(ResponseInterceptor, (error) => {
  const expectedErrors =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedErrors) {
    console.log("error", error);
    return;
  } else {
    if (error.response.status === 401) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("userId");
      const history = useHistory();
      history.push("/login");
    }
    return Promise.reject(error);
  }
});
