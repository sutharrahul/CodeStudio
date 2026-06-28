import { axiosInstance } from "./axios-instance";
import { CodeResponse, CodeSaveRequest } from "./typings";

export const saveCode = async (
  requestBody: CodeSaveRequest
): Promise<CodeResponse> => {
  const res = await axiosInstance.post(`save`, requestBody);
  return res.data as CodeResponse;
};

export const getCode = async (codeId: number): Promise<CodeResponse> => {
  const res = await axiosInstance.get(`save/${codeId}`);
  return res.data as CodeResponse;
};
