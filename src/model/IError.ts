export interface IErrors {
  payload?: IError
}

export interface IError {
  AxiosError: {
    message?: string
    name?: string
  }
}
