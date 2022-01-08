import { Injectable } from '@angular/core';

@Injectable()
export class SharedService {

  shareddata: any[];
  constructor() { }

   get data(): any{
    return this.shareddata;
  }

  set data(val: any){
    this.shareddata = val;
    console.log(this.shareddata);
  }

}