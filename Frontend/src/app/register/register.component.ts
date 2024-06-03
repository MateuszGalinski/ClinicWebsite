import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { signUpPatient } from '../auth/signUpPatient';
import {LoginInfo} from "../auth/login-info";
import {TokenStorageService} from "../auth/token-storage.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {};
  signupInfo?: signUpPatient;
  isSignedUp = false;
  isSignUpFailed = false;
  private loginInfo?: LoginInfo;
  errorMessage = '';
  hide = true;

  constructor(private authService: AuthService, private  tokenStorage: TokenStorageService) { }

  ngOnInit() { }

  switchVisibility():boolean {
    this.hide = !this.hide;
    return false;
  }

  onSubmit() {
    console.log(this.form);

    this.signupInfo = new signUpPatient(
      this.form.username,
      this.form.password,
      this.form.name,
      this.form.surname,
      this.form.telephone
    );

    this.authService.signUpPatient(this.signupInfo).subscribe({
      next: (data) => {
        console.log(data);
        this.isSignedUp = true;
        this.isSignUpFailed = false;
        this.loginInfo = new LoginInfo(this.form.username, this.form.password);

        this.login()
      },
      error: (error) => {
        console.log(error);
        this.errorMessage = error.error.message;
        console.log(this.errorMessage);
        this.isSignUpFailed = true;
      }
    });


  }

  login(){
    if(this.loginInfo == null){
      return
    }
    this.authService.attemptAuth(this.loginInfo).subscribe({
      next:(data)  =>
      {
        this.tokenStorage.saveToken(data.accessToken || '{}');
        this.tokenStorage.saveUsername(data.username || '{}');
        this.tokenStorage.saveAuthorities(data.authorities || []);

      }
      ,
      error: (error) => {
        console.log(error);
        this.errorMessage = error.error.message;
      }
    });
  }
}
