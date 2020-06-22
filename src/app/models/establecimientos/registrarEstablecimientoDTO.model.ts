export class RegistrarEstablecimientoModel{

    public nombre:string;
    public direccion:string;
    public idLocalizacion:number;
    public idCategoria:number;
    public barrio:string;
    public descripcion:string;
    public idUsuario:number;
    public holgura:number;
    public capacidad:number;
    public imagen:string;
    public horaInicio:string;
    public horaFin:string;

    constructor(nombre:string,direccion:string,idLocalizacion:number,idCategoria:number,barrio:string,descripcion:string,idUsuario:number,holgura:number,capacidad:number,imagen:string,horaInicio:string,horaFin:string){
        this.nombre = nombre;
        this.direccion = direccion;
        this.idLocalizacion = idLocalizacion;
        this.idCategoria = idCategoria;
        this.barrio = barrio;
        this.descripcion = descripcion;
        this.idUsuario = idUsuario;
        this.holgura = holgura;
        this.capacidad = capacidad;
        this.imagen = imagen;
        this.horaInicio = horaInicio;
        this.horaFin = horaFin;
    }
}