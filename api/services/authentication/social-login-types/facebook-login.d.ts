export type GetAccessTokenFromFacebookResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
};
  
export type GetProfileUserFacebookResponse = {
  id: string;
  name: string;
  email: string;
  picture: { 
    data: {
      url?: string;
    } 
  }
};