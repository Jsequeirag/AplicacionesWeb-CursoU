import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-valoration',
  templateUrl: './valoration.component.html',
  styleUrls: ['./valoration.component.css'],
})
export class ValorationComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.redirectFunc();
  }

  redirectFunc() {
    setInterval(function () {
      window.location.replace('dashboard');
    }, 3000);
  }
}
