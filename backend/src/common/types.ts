export interface ApiResponse<T> {
  errorMessage?: string
  success: boolean
  data?: T
}

export interface Dictionary<T> {
  [key: string]: T
}

export interface ExecuteInput {
  code: string
  input: string
  lang: string
}

export interface ExecuteOutput {
  output: string
  error: boolean
}

export interface SaveCodeInput {
  lang: string
  code: string
}

export interface CodeData {
  id: number
  code: string
  lang: string
  created_on: Date | null
}
