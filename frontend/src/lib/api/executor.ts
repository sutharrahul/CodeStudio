import { axiosInstance } from "./axios-instance";
import { ExecuteRequest, ExecuteResponse } from "./typings";

export const execute = async ({
  lang,
  code,
  input,
}: ExecuteRequest): Promise<ExecuteResponse | undefined> => {
  try {
    const requestBody = {
      code,
      lang,
      input,
    };
    const res = await axiosInstance.post(`execute`, requestBody);
    return res.data as ExecuteResponse;
  } catch (e) {
    console.error(e);
  }
};

export const ping = async (): Promise<boolean> => {
  try {
    const res = await axiosInstance.get(`ping`);
    const status = res.status;
    if (status <= 299) return true;
    return false;
  } catch (e) {
    console.error(e);
    return false;
  }
};
