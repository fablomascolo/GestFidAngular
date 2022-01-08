import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ITransazioni, IMessage } from '../Models/interfaces';
import { catchError, map } from 'rxjs/operators'

import { Injectable } from '@angular/core';
import { baseURL } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class TransazioniService {

  private _transazioni: BehaviorSubject<ITransazioni[]>;

  private dataStore: {
    transazioni: ITransazioni[];
  }

  constructor(private httpClient: HttpClient) {
    this.dataStore = { transazioni: [] };
    this._transazioni = new BehaviorSubject<ITransazioni[]>([]);
  }

  //metodo per l'inserimento della transazione
  insTransazione(transazione: ITransazioni) {

    const Url = `${baseURL}/transazioni/inserisci`;
    this.httpClient.post<IMessage>(Url, transazione)
      .subscribe(
        response => {
          console.log(response);
        },
        error => {

          transazione = null;
          console.log(error);
        }
      )

      return new Promise((resolver, reject) => {

        if (transazione != null)
        {
          var removeIndex =  this.dataStore.transazioni.map(item => item.id).indexOf(transazione.id);
          ~removeIndex && this.dataStore.transazioni.splice(removeIndex, 1);

          this.dataStore.transazioni.push(transazione);
          //this.dataStore.transazioni.sort((a, b) => (a.nominativo > b.nominativo) ? 1 : -1)
          this._transazioni.next(Object.assign({}, this.dataStore).transazioni);
        }

        resolver(transazione);
      })
  }

  //metodo per la eliminazione della transazione 
  delTransazione(id: number) {
    const Url = `${baseURL}/transazioni/elimina/${id}`;
    this.httpClient.delete<IMessage>(Url)
    .pipe(catchError(this.handleError))
    .subscribe(
      response => {
        console.log(response);
        this.getAll();
      }
    )
  }

  handleError(error: HttpErrorResponse) {

    let errorMessage = 'Errore Sconosciuto!';

    let errore: IMessage;
    errore = error.error;

    if (error.error instanceof ErrorEvent) {

      errorMessage = `Errore: ${error.error.message}`;

    }
    else {
      errorMessage = errore.messaggio;
    }

    window.alert(errorMessage);
    return throwError(error);

  }

  getAll() {

    const Url = `${baseURL}/transazioni/cerca/`;

    return this.httpClient.get<ITransazioni[]>(Url)
      .subscribe(data => {
        this.dataStore.transazioni = data;
        console.log(data);

        this._transazioni.next(Object.assign({}, this.dataStore).transazioni);
      })
  }

  get transazioni(): Observable<ITransazioni[]> {
    return this._transazioni.asObservable();
  }

  //metodo per richiamare una transazione per il suo identificativo (da usare nella funzione Modifica)
  getById(id : number) {
    const Url = `${baseURL}/transazioni/cerca/codice/${id}`;
    return this.httpClient.get<ITransazioni>(Url)
      .pipe(map(data => this.convertDataTransazioni(data)));
  }

  private convertDataTransazioni(data: ITransazioni) {
    return {
      id: data.id,
      dataTransazione: data.dataTransazione,
      codfid: data.codfid,
      puntoVendita: data.puntoVendita,
      bollini: data.bollini,
      cliente: data.cliente
    }
  }
}
