export class signUpPatient {
  username : string;

  role = "user";

  name : string;

  surname : string;

  password : string;

  telephone : string;

  constructor(username : string, password : string, name : string, surname : string, telephone : string) {
    this.username = username;
    this.name = name;
    this.surname = surname;
    this.password = password;
    this.telephone = telephone;
  }
}
