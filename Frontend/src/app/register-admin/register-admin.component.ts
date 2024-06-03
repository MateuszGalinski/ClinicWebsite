import { Component } from '@angular/core';
import {LoginInfo} from "../auth/login-info";
import {AuthService} from "../auth/auth.service";
import {TokenStorageService} from "../auth/token-storage.service";
import {SignupInfo} from "../auth/signup-info";

@Component({
  selector: 'app-register-admin',
  templateUrl: './register-admin.component.html',
  styleUrls: ['./register-admin.component.css']
})
export class RegisterAdminComponent {
  hide = true;
  form: any = {};
  token?: string;
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';
  private signupInfo?: SignupInfo;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService) { }

  onSubmit(formDirective: any) {
    console.log(this.form);

    this.signupInfo = new SignupInfo(this.form.username, ["admin","doctor","user"],this.form.password);

    this.authService.signUp(this.signupInfo).subscribe({
      next:(data)  =>
      {
        this.isSignUpFailed = false;
        this.isSignedUp = true;
        formDirective.resetForm();
        this.form = {
          username: '',
          password: ''
        };
        alert("Admin registered successfully")
      }
      ,
      error: (error) => {
        formDirective.resetForm();
        this.form = {
          username: '',
          password: ''
        };
        this.errorMessage = error.error.message;
        console.log(this.errorMessage);
        this.isSignUpFailed = true;
        alert("Something went wrong with admin registration")
      }
    });


  }
  switchVisibility():boolean {
    this.hide = !this.hide;
    return false;
  }

}
