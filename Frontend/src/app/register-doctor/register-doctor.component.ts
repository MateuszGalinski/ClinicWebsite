import { Component } from '@angular/core';
import {signUpPatient} from "../auth/signUpPatient";
import {LoginInfo} from "../auth/login-info";
import {AuthService} from "../auth/auth.service";
import {TokenStorageService} from "../auth/token-storage.service";
import {signUpDoctor} from "../auth/signUpDoctor";
import {Doctor} from "../globalForms/doctor";

@Component({
  selector: 'app-register-doctor',
  templateUrl: './register-doctor.component.html',
  styleUrls: ['./register-doctor.component.css']
})
export class RegisterDoctorComponent {
  form: any = {};
  signupInfo?: signUpDoctor;
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';
  hide = true;

  constructor(private authService: AuthService, private  tokenStorage: TokenStorageService) { }


  switchVisibility():boolean {
    this.hide = !this.hide;
    return false;
  }

  onSubmit(formDirective:any) {

    this.signupInfo = new signUpDoctor(
      this.form.username,
      this.form.password,
      this.form.name,
      this.form.surname,
      this.form.specialization
    );

    this.authService.signUpDoctor(this.signupInfo).subscribe({
      next: (data) => {
        console.log(data);
        this.isSignedUp = true;
        this.isSignUpFailed = false;
        alert("Doctor registered successfully")
        this.resetForm(formDirective);
      },
      error: (error) => {
        console.log(error);
        this.errorMessage = error.error.message;
        console.log(this.errorMessage);
        this.isSignUpFailed = true;
        // this.resetForm(formDirective);
        alert("Something went wrong")
      }
    });
  }

  resetForm(formDirective: any){
    formDirective.reset();
    this.form ={
      "username": '',
      "password": '',
      "name": '',
      "surname": '',
      "specialization": ''
    };
    formDirective.submitted = false;
  }
}
