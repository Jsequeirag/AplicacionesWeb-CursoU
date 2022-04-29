import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/tokenStorage.service/token-storage.service';
import { navbarHidden } from '../utils/navbarHidden';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(
    private router: Router,
    private tokenStorage: TokenStorageService
  ) {}

  ngOnInit(): void {
    navbarHidden();
  }
  logout() {
    alert('logout');
    window.location.replace('/');
    this.tokenStorage.signOut();
  }
}
