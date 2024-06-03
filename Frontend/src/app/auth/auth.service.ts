import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LoginInfo} from './login-info';
import {Observable} from 'rxjs';
import {JwtResponse} from './jwt-response';
import {SignupInfo} from './signup-info';
import {signUpPatient} from "./signUpPatient";
import {signUpDoctor} from "./signUpDoctor";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = 'http://localhost:8080/auth/signin';
  private signupUrl = 'http://localhost:8080/auth/signup';
  private signupPatientUrl = 'http://127.0.0.1:8080/auth/signup/patient';
  private signupDoctorUrl = 'http://127.0.0.1:8080/auth/signup/doctor';
  private signupAdminUrl= 'http://127.0.0.1:8080/auth/signup/admin';

  constructor(private http: HttpClient) { }

  attemptAuth(credentials: LoginInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.loginUrl, credentials, httpOptions);
  }

  signUp(info: SignupInfo): Observable<string> {
    return this.http.post<string>(this.signupUrl, info, httpOptions);
  }

  signUpPatient(info: signUpPatient): Observable<any> {
    return this.http.post(this.signupPatientUrl, info, httpOptions);
  }

  signUpDoctor(info: signUpDoctor): Observable<any> {
    return this.http.post(this.signupDoctorUrl, info, httpOptions);
  }
}
