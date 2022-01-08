import { Component, Inject, OnInit } from '@angular/core';
import { ITransazioni } from '../../Models/interfaces';
import { FormControl, Validators } from '@angular/forms';

import { TransazioniService } from '../../services/transazioni.service';

import { SharedService } from '../../services/shared.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-spesa-dialog',
  templateUrl: './new-spesa-dialog.component.html',
  styleUrls: ['./new-spesa-dialog.component.scss'],
})

export class NewSpesaDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<NewSpesaDialogComponent>,
    private transazioniService: TransazioniService,
    public sharedService: SharedService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar) { }

  transazione: ITransazioni = {
    id: null,
    dataTransazione: null,
    codfid: '',
    puntoVendita: '',
    bollini: null,
    cliente: null
  };

  dataTransazione = new FormControl('', [Validators.required]);
  codfid = new FormControl(this.sharedService.data, [Validators.required]);
  puntoVendita = new FormControl('', [Validators.required]);
  bollini = new FormControl('', [Validators.required]);

  ngOnInit(): void {
    if (this.data) {
      console.log(this.data.id);

      this.transazioniService.getById(this.data.Id)
      .subscribe(
        response => {
          this.transazione = response;
          this.data.setValue(this.transazione.dataTransazione);
          this.codfid.setValue(this.transazione.codfid);
          this.puntoVendita.setValue(this.transazione.puntoVendita);
          this.bollini.setValue(this.transazione.bollini);          
          this.codfid.disable();
          console.log(this.transazione);
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  dismiss() {
    this.dialogRef.close(null);
  }

  save() {

    if (this.dataTransazione.value == '' || this.puntoVendita.value == '' || this.bollini.value == '' ) {
      this.openSnackBar(`Operazione impossibile: data, punto vendita e bolli sono obbligatori`, "Chiudi")
        .onAction().subscribe(() => {            
        });
    }
    else
    {
      //impostiamo il model coi valori del form
      //this.transazione.id = null;
      this.transazione.codfid = this.codfid.value;
      this.transazione.dataTransazione = this.dataTransazione.value;
      this.transazione.puntoVendita = this.puntoVendita.value;
      this.transazione.bollini = this.bollini.value;
      //this.transazione.cliente = null;
      this.dialogRef.close(this.transazioniService.insTransazione(this.transazione));
    }
  }

  //implementiamo uno snackbar per descrivere l'eventuale errore in fase di inserimento
  openSnackBar(message: string, action: string) : MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 5000,
  })};

}

