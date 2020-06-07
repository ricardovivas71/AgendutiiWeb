export class AgendarCitaModel{

    public fechaInicio:string;
    public fechaFin:string;
    public observacion:string;
    public idUsuario:number;
    public idEmpleado:number;

    constructor(fechaInicio:string,fechaFin:string,observacion:string,idUsuario:number,idEmpleado:number){
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.observacion = observacion;
        this.idUsuario = idUsuario;
        this.idEmpleado = idEmpleado;
    }
}