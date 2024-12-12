export interface DefaultResponse<T> {
  data: T[];
  message: string;
  status: string;
}

export interface SecondDefaultResponse<T> {
  data: T;
  message: string;
  status: string;
}
