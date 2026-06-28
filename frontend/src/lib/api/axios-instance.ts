import Axios, { AxiosError, AxiosResponse } from "axios";

const axiosInstance = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3010",
});

const successHandler = (response: AxiosResponse) => {
  return response;
};

const errorHandler = async (error: AxiosError): Promise<AxiosError> => {
  console.log(`error_status=${error.message} `);
  return Promise.reject(error);
};

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => successHandler(response),
  (error: AxiosError) => errorHandler(error)
);

export { axiosInstance };
