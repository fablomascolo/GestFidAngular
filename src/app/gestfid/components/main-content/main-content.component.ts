import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

import { ActivatedRoute } from '@angular/router';
import { ClientiService } from '../../services/clienti.service';
import { SharedService } from '../../services/shared.service';
import {IClienti2} from '../../Models/interfaces';
import { NewClienteDialogComponent } from '../new-cliente-dialog/new-cliente-dialog.component';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {

  cliente: IClienti2;
  codFid: string;

  constructor(
      private route: ActivatedRoute,
      private clienteService: ClientiService,
      public sharedService:SharedService,
      private dialog : MatDialog, 
      private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.codFid = params['codFid'];
      console.log("CodFid: " + this.codFid);

      if (!this.codFid) this.codFid = '67100057';

      this.cliente = null;

      if (this.codFid) {
        this.getDatiCliente();
      }

    },
    error => {
      console.log(error);
    })
  }

  getDatiCliente() {

    this.clienteService.getByCodFid(this.codFid).subscribe(
      response => {
        console.log('Ricerchiamo il cliente ');

        this.cliente = response;
        //qui posso salvare il parametro codfid sul servizio condiviso
        this.sharedService.data = this.cliente.codFid;
        console.log(this.cliente);
    },
    error => {
      console.log(error);
    })

  }

  Elimina(Codfid: string) {
    console.log("Eliminazione Codice: " + Codfid);
    this.clienteService.delCliente(Codfid);
    this.openSnackBar(`Cancellazione effettuata`, "Chiudi")
    .onAction().subscribe(() => {            
    });
  }

  Modifica(Codfid: string) {
    console.log("Modifica Codice: " + Codfid);

    let dialogRef = this.dialog.open(NewClienteDialogComponent, {
      width: '450px',
      //height: '400px',
      data: {
        codFid: Codfid,
        title: "Modifica cliente"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("il dialog è stato chiuso", result);
      this.getDatiCliente();
    });


  }
  //implementiamo uno snackbar per descrivere l'eventuale errore in fase di inserimento
  openSnackBar(message: string, action: string) : MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 5000,
  })};

}
