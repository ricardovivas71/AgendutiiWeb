export class HorarioEmpleadoDtoModel{
    public idEmpleado:number;
    public fechaCita: string;

    constructor(idEmpleado:number,fechaCita:string){
        this.idEmpleado = idEmpleado;
        this.fechaCita = fechaCita;
    }
}