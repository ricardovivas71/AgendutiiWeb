export class EmpleadosModel{
    public idEmpleado: number;
    public nombre:string;
    public lunes:boolean;
    public martes:boolean;
    public miercoles:boolean;
    public jueves:boolean;
    public viernes:boolean;
    public sabado:boolean;
    public domingo:boolean;

    constructor(idEmpleado:number, nombre:string,lunes:boolean,martes:boolean,miercoles:boolean,jueves:boolean,viernes:boolean,sabado:boolean,domingo:boolean){
        this.idEmpleado = idEmpleado;
        this.nombre = nombre;
        this.lunes = lunes;
        this.martes = martes;
        this.miercoles = miercoles;
        this.jueves = jueves;
        this.sabado = sabado;
        this.domingo = domingo;
    }
}