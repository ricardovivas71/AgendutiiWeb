export class ConsultarEmpleadosModel{
    public idEstablecimiento: number;
    public idServicio: number;
    public fechaCita: string;

    constructor(idEstablecimiento: number, idServicio:number,fechaCita:string){
        this.idEstablecimiento = idEstablecimiento;
        this.idServicio = idServicio;
        this.fechaCita = fechaCita;
    }
}