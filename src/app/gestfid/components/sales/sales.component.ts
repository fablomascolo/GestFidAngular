import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { TransazioniService } from '../../services/transazioni.service';

import { ITransazioni } from '../../Models/interfaces';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit, AfterViewInit  {

  displayedColumns: string[] = ['id', 'data', 'puntoVendita', 'bollini', 'modifica', 'elimina'];
  dataSource: MatTableDataSource<ITransazioni>;

  @Input() sales: ITransazioni[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private transazioniService: TransazioniService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    console.log(this.sales);

    this.dataSource = new MatTableDataSource<ITransazioni>(this.sales);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  Elimina(id: bigint) {
    console.log("Eliminazione Id: " + id);
    this.transazioniService.delTransazione(id);
    this.openSnackBar(`Cancellazione effettuata`, "Chiudi")
    .onAction().subscribe(() => {            
    });
  }

   Modifica(Codfid: string) {
  //   console.log("Modifica Codice: " + Codfid);

  //   let dialogRef = this.dialog.open(NewClienteDialogComponent, {
  //     width: '450px',
  //     //height: '400px',
  //     data: {
  //       codFid: Codfid
  //     }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log("il dialog è stato chiuso", result);
  //     this.getDatiCliente();
  //   });

  }

  //implementiamo uno snackbar per descrivere l'eventuale errore in fase di inserimento
  openSnackBar(message: string, action: string) : MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 5000,
  })};
}
