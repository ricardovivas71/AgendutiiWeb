export class HorasDisponiblesModel{
    idHora:number;
    hora:Date;
    disponible:boolean;

    constructor(idHora:number,hora:Date,disponible:boolean){
        this.idHora = idHora;
        this.hora = hora;
        this.disponible = disponible;
    }
}