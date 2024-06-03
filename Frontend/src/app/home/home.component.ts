import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../auth/token-storage.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  info: any;

  constructor(private token: TokenStorageService) { }

  ngOnInit() {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };
  }

  logout() {
    this.token.signOut();
    window.location.reload();
  }


  isUser() : boolean {
    if (this.info.authorities.length === 1){
      if (this.info.authorities[0] === "ROLE_USER"){
        return true;
      }
    }

    return false;
  }

  isDoctor() : boolean {
    if (this.info.authorities.length === 1){
      if (this.info.authorities[0] === "ROLE_DOCTOR"){
        return true;
      }
    }

    return false;
  }

  isAdmin() : boolean {
    return this.info.authorities.includes("ROLE_ADMIN");
  }
}
