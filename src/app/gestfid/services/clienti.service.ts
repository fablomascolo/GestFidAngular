import { HttpClient } from '@angular/common/http';
import { getAllLifecycleHooks } from '@angular/compiler/src/lifecycle_reflector';
import { Injectable } from '@angular/core';
import { IClienti } from '../models/interface';
import { baseURL } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class ClientiService {

  constructor(private httpclient: HttpClient) { }    
    //creiamo un metodo per il recupero di tutti i clienti
    getAll(){
      const Url=`${baseURL}/cerca`;
      return this.httpclient.get<IClienti[]>(Url);
    }
    //creiamo un metodo per recuperare i dati di uno specifico cliente
    getByCodFid(codfid:string){
      const Url = `${baseURL}/cerca/codice/${codfid}`;
      return this.httpclient.get<IClienti[]>(Url);
    }
}
