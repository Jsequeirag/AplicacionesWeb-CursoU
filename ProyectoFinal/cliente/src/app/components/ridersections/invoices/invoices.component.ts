import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { navbarHidden } from '../../utils/navbarHidden';
import { InvoicesService } from 'src/app/services/invoices.service/invoices.service';
import { TokenStorageService } from 'src/app/services/tokenStorage.service/token-storage.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Invoice } from '../../../models/invoice';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GoogleplaceService } from 'src/app/services/googleplaces.services/googleplace.service';
@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css'],
})
export class InvoicesComponent implements OnInit {
  userInvoices: Invoice[] = [];
  token: any;
  user: any;
  displayedColumns: string[] = [
    'Date',
    'Amount',
    'Valoration',
    'Name',
    'Details',
  ];
  dataSource!: MatTableDataSource<any>;

  //Para la paginación
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private invoicesService: InvoicesService,
    private tokenStorageService: TokenStorageService,
    public dialog: MatDialog
  ) {
    this.token = tokenStorageService.getToken();
    this.user = tokenStorageService.getUser();
    this.invoices();
  }

  ngOnInit(): void {
    navbarHidden();
  }

  async invoices() {
    this.userInvoices = await this.invoicesService.getInvoicesById(
      this.user._id,
      this.token
    );
    console.log(this.userInvoices);
    this.dataSource = new MatTableDataSource(this.userInvoices);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  openDialog(details: any) {
    this.dialog.open(invoiceDialog, {
      data: details,
    });
  }
}

@Component({
  selector: 'invoiceDialog',
  templateUrl: 'invoiceDialog.html',
  styleUrls: ['./invoices.component.css'],
})
export class invoiceDialog {
  driverDistance: any;
  driverDuration: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private GoogleplaceService: GoogleplaceService
  ) {}
  async ngOnInit() {
    await this.GoogleplaceService.googleMapInvoice({
      destination: this.data.destination,
      origin: this.data.origin,
    });
    const driverDurationAndDistance =
      this.GoogleplaceService.getDurationDistanceDriver();
    this.driverDistance = driverDurationAndDistance.driverDistance;
    this.driverDuration = driverDurationAndDistance.driverDuration;
    this.chanceDriverDistanAndDuration();
  }

  chanceDriverDistanAndDuration() {
    document.getElementById('driver-distance')!.innerText = this.driverDistance;
    document.getElementById('driver-duration')!.innerText = this.driverDuration;
  }
}
