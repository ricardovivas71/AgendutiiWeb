export class RegistrarServicioModel{

    public nombre:string;
    public descripcion:string;
    public precio:number;
    public tiempoAtencion:number;
    public idEstablecimiento:number;

    constructor(nombre:string,descripcion:string,precio:number,tiempoAtencion:number,idEstablecimiento:number){
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.tiempoAtencion = tiempoAtencion;
        this.idEstablecimiento = idEstablecimiento;
    }
}