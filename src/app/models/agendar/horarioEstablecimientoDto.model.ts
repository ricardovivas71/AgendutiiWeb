export class horarioEstablecimientoDtoModel{
    public idEstablecimiento:number;
    public fechaCita:string;

    constructor(idEstablecimiento:number,fechaCita:string){
        this.idEstablecimiento = idEstablecimiento;
        this.fechaCita = fechaCita;
    }
}