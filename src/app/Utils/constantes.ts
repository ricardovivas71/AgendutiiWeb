export class Constantes{

    public static readonly formatoFechaLargo: string = 'dd/MM/yyyy hh:mm:ss a';
    public static readonly idEstadoConfirmada:number = 2;
    public static readonly idEstadoRechazada:number = 4;

    public static readonly ApiConsultarLocalizacion: string = "/api/agendamiento/busqueda/localizacion";
    public static readonly ApiConsultarTiposServicio: string = "/api/agendamiento/busqueda/categorias";
    public static readonly ApiConsultarBarrios: string = "/api/agendamiento/busqueda/barrios";
    public static readonly ApiConsultarEstablecimientos: string = "/api/agendamiento/establecimiento/establecimientos";
    public static readonly ApiConsultarServicios:string = "/api/agendamiento/busqueda/servicios";
    public static readonly ApiConsultarEmpleados:string = "/api/agendamiento/busqueda/empleadosActivos";
    public static readonly ApiConsultarHorarioEstablecimiento = "/api/agendamiento/busqueda/horariosEstablecimiento";
    public static readonly ApiConsultarDispColaborador = "/api/agendamiento/busqueda/horariosEmpleado";
    public static readonly ApiAgendarCita = "/api/agendamiento/Cita/Nueva";
    public static readonly ApiRegistrarUsuario = "/api/agendamiento/Usuario/NuevoUsuario";
    public static readonly ApiConsultarCitasPropias = "/api/agendamiento/Cita/Propias";
    public static readonly ApiRegistrarEstablecimiento = "/api/agendamiento/establecimiento/registrar";
    public static readonly ApiConsultarCiudades: string = "/api/agendamiento/busqueda/ciudades";
    public static readonly ApiConsultarMisEstablecimiento: string = "/api/agendamiento/establecimiento/misEstablecimientos";
    public static readonly ApiConsultarServiciosEstablecimiento:string = "/api/agendamiento/busqueda/servicios";
    public static readonly ApiRegistrarServicio = "/api/agendamiento/establecimiento/nuevoServicio";
    public static readonly ApiEliminarServicio = "/api/agendamiento/establecimiento/eliminarServicio";
    public static readonly ApiConsultarEmpleadosEstab = "/api/agendamiento/Empleado/misEmpleados";
    public static readonly ApiRegistrarEmpleados = "/api/agendamiento/Empleado/NuevoEmpleado";
    public static readonly ApiLoginUsuario = "/api/agendamiento/Usuario/login";
    public static readonly ApiEliminarEmpleado = "/api/agendamiento/Empleado/EliminarEmpleado";
    public static readonly ApiEliminarEstablecimiento = "/api/agendamiento/establecimiento/eliminarEstablecimiento";
    public static readonly ApiConsultarCitaEstablecimiento = "/api/agendamiento/Cita/establecimiento";
    public static readonly ApiGestionarCitas = "/api/agendamiento/Cita/estadoCita";

}
