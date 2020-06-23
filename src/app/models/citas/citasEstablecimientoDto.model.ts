export class CitasEstablecimientoDtoModel{
    public idEstablecimiento: number;
    public fecha:string;

    constructor(idEstablecimiento:number, fecha:string){
        this.idEstablecimiento = idEstablecimiento;
        this.fecha = fecha;
    }
}