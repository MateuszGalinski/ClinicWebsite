export class SignupInfo {

  username: string;
  role: string[];
  password: string;

  constructor(username: string, roles: string[], password: string) {
    this.username = username;
    this.role = roles;
    this.password = password;
  }
}
