
export interface IClienti {
  codFid: string
  nominativo: string
  comune: string
  idAvatar: string
  stato: number
  transazioni: Array<ITransazioni>
}

export interface IClienti2 {
  codFid: string
  nominativo: string
  comune: string
  idAvatar: string
  stato: string
  bollini: number
  spese: number
  dataSpesa: Date
  transazioni: Array<ITransazioni>
}

export interface ITransazioni {
  id: bigint
  dataTransazione: Date
  codfid: string
  puntoVendita: string
  bollini: number
  cliente: IClienti
}

export interface IMessage {
  messaggio: string
}

export interface IStatoCliente {
  value: number;
  viewValue: string;
}
