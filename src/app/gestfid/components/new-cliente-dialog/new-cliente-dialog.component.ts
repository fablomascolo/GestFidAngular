import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { ClientiService } from '../../services/clienti.service';
import { IClienti, IStatoCliente } from '../../Models/interfaces';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-cliente-dialog',
  templateUrl: './new-cliente-dialog.component.html',
  styleUrls: ['./new-cliente-dialog.component.scss']
})
export class NewClienteDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<NewClienteDialogComponent>,
    private clientiService: ClientiService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar) { }

  cliente: IClienti = {
    codFid: '-1',
    nominativo: '',
    comune: '',
    idAvatar: '',
    stato: 0,
    transazioni: null
  };

  statoCliente: IStatoCliente[] =
  [
    {
      value: 0,
      viewValue: 'Non Attivo'
    },
    {
      value: 1,
      viewValue: 'Attivo'
    }
  ];

  avatars = [
    'svg-1','svg-2','svg-3','svg-4','svg-5','svg-6','svg-7',
    'svg-8','svg-9','svg-10','svg-11','svg-12'
  ]

  codfid = new FormControl('', [Validators.required]);
  nome = new FormControl('', [Validators.required, Validators.maxLength(50), Validators.minLength(6)]);
  stato = new FormControl(1);

  getErrMsgCodFid() {

    return this.codfid.hasError('required') ? 'Devi inserire il codice fidelity!' : '';
  }

  getErrMsgNominativo() {

    if (this.nome.hasError('maxlength')) {
      return 'Il nome deve avere un massimo di 50 caratteri!';
    }

    if (this.nome.hasError('minlength')) {
      return 'Il nome deve avere almeno 6 caratteri!';
    }

    if (this.nome.hasError('required')) {
      return 'Devi inserire il nominativo';
    }
  }

  ngOnInit(): void {

    if (this.data) {
      console.log(this.data.codFid);

      this.clientiService.getByCodFid2(this.data.codFid)
      .subscribe(
        response => {
          this.cliente = response;
          this.codfid.setValue(this.cliente.codFid);
          this.nome.setValue(this.cliente.nominativo);
          this.stato.setValue(this.cliente.stato);

          this.codfid.disable();

          console.log(this.cliente);
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

    if (this.codfid.value == '' || this.nome.value == '' ) {
      this.openSnackBar(`Operazione impossibile: codice fidelity e/o nome sono obbligatori`, "Chiudi")
        .onAction().subscribe(() => {
            //this.router.navigate(['/gestfid', result.__zone_symbol__value.codFid]);
        });
    }
    else
    {
      this.cliente.codFid = this.codfid.value;
      this.cliente.nominativo = this.nome.value;
      this.cliente.stato = this.stato.value;
      this.dialogRef.close(this.clientiService.insCliente(this.cliente));
    }
    /*
    this.clientiService.insCliente(this.cliente).subscribe(
      response => {
        console.log(response);

        this.dialogRef.close(this.cliente);
      },
      error => {
        console.log(error);
      }
    )
    */
  }

  //implementiamo uno snackbar per descrivere l'eventuale errore in fase di inserimento
  openSnackBar(message: string, action: string) : MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 5000,
  })};

}
