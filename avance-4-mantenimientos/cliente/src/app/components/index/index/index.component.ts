import { Component, OnInit } from '@angular/core';
import { navbarHidden } from '../../utils/navbarHidden';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    navbarHidden();
  }
}
