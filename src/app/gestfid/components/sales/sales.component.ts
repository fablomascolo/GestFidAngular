import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';

import { ITransazioni } from '../../Models/interfaces';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit, AfterViewInit  {

  displayedColumns: string[] = ['id', 'data', 'puntoVendita', 'bollini'];
  dataSource: MatTableDataSource<ITransazioni>;

  @Input() sales: ITransazioni[];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() { }

  ngOnInit(): void {
    console.log(this.sales);

    this.dataSource = new MatTableDataSource<ITransazioni>(this.sales);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
