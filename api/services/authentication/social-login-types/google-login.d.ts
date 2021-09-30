export type GetAccessTokenFromGoogleResponse = {
  access_token?: string;
  expires_in?: number;
  scope?: string;
  token_type?: string;
  id_token?: string;
  error?: Error;
  error_description?: string;
};

export type GetUserInfoResponse = {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
};