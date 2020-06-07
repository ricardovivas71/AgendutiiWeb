export class HorarioEmpleadoModel{
    public idCita:number;
    public fechaInicio:Date;
    public fechaFin:Date;

    constructor(idCita:number,fechaInicio:Date,fechaFin:Date){
        this.idCita = idCita;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
    }
}