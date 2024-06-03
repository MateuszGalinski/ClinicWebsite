export class signUpDoctor {
  username : string;

  role = "doctor";

  name : string;

  surname : string;

  password : string;

  specialization : string;

  constructor(username : string, password : string, name : string, surname : string, specialization : string) {
    this.username = username;
    this.name = name;
    this.surname = surname;
    this.password = password;
    this.specialization = specialization;
  }
}
