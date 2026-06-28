export type CodeSaveRequest = {
  code?: string;
  lang: string;
};

export type CodeResponse = {
  data?: CodeData;
  success: boolean;
  errorMessage?: string;
};

export interface CodeData {
  id: number;
  code: string;
  lang: string;
  created_on: Date;
}

export type ExecuteRequest = {
  lang: string;
  code: string;
  input: string;
};

export type ExecuteResponse = {
  data?: ExecData;
  success: boolean;
  errorMessage?: string;
};

export interface ExecData {
  output: string;
  error: boolean;
}
