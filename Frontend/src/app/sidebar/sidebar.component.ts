import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "../auth/token-storage.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{
  isCollapsed : boolean = false;
  authorities : String[] = [];
  isLoggedIn : boolean = false;

  constructor(private token: TokenStorageService) { }

  ngOnInit() {
    if (this.token.getToken() != null && this.token.getToken() != '{}') {
      this.isLoggedIn = true;
      this.authorities = this.token.getAuthorities()
    }
  }
  toggleMenu() {
    this.isCollapsed = !this.isCollapsed;
  }

  isUser() : boolean {
    if (this.authorities.length === 1){
      if (this.authorities[0] === "ROLE_USER"){
        return true;
      }
    }

    return false;
  }

  isDoctor() : boolean {
    if (this.authorities.length === 1){
      if (this.authorities[0] === "ROLE_DOCTOR"){
        return true;
      }
    }

    return false;
  }

  isAdmin() : boolean {
    return this.authorities.includes("ROLE_ADMIN");
  }
}
