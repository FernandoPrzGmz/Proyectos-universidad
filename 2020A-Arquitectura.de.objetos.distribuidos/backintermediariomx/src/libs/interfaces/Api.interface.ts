
export interface JWT {
  iat: number;
  exp: number;
  data: {
    UserID:    number;
    FirstName: string;
    LastName:  string;
    Country:   string;
  }
}
export interface ApiResponse {
  status: number;
  message: string;
}

export interface ApiResult extends ApiResponse {
  result: any;
}

export interface ApiResults extends ApiResponse {
  results: any[];
}
