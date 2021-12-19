export interface IClienti
{
    codfid: string,
    nominativo: string,
    comune: string,
    idavatar: string,
    stato: number
}
export interface ITransazioni
{
    id: number,
    data: Date,
    codfid: string, 
    puntovendita: string,
    bollini: number
}


