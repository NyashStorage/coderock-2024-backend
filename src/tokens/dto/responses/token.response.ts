export class TokenResponse {
  access_token: string;
}

export class TokensResponse extends TokenResponse {
  refresh_token: string;
}
