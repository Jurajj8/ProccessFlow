export interface UserCredentials {
  email: string;
  password: string;
  userName: string;
  profileImagePath?: string;
}

export interface AuthenticatorResponse {
  token: string;
  expiration: Date;
}
