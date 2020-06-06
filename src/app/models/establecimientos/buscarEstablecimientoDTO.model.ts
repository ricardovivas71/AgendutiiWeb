export class BuscarEstablecimientoModel{
    idCiudad:number;
    barrio: string;
    idCategoriaEst:number;
    constructor(idCiudad:number,barrio:string,idCategoriaEst:number){
        this.idCiudad = idCiudad;
        this.barrio = barrio;
        this.idCategoriaEst = idCategoriaEst;
    }
}