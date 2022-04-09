import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/tokenStorage.service/token-storage.service';
import { driver } from '../../utils/selectRole';
@Component({
  selector: 'app-indexdashboard',
  templateUrl: './indexdashboard.component.html',
  styleUrls: ['./indexdashboard.component.css'],
})
export class IndexdashboardComponent implements OnInit {
  roles: any;
  driverRole: boolean = false;
  riderRole: boolean = false;
  adminRole: boolean = false;
  constructor(private tokenStorage: TokenStorageService) {}

  ngOnInit(): void {
    //antes del render
    console.log(this.tokenStorage.getUser().roles);
    this.getUserRole();
  }

  getUserRole() {
    this.roles = this.tokenStorage.getUser().roles;
    if (this.roles === 'driver') {
      this.driverRole = true;
    }
    if (this.roles === 'rider') {
      this.riderRole = true;
    }
    if (this.roles === 'admin') {
      this.adminRole = true;
    }
    console.log(this.roles);
  }
}
