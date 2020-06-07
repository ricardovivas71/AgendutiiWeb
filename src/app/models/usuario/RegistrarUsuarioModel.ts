export class RegistrarUsuarioModel{
        nombre: string;
        apellido: string;
        email: string;
        contrasena: string;
        telefono: string;
        tipoUsuario: boolean;

        constructor(nombre, apellido, email, contrasena, telefono, tipoUsuario){
                this.nombre=nombre;
                this.apellido=apellido;
                this.email=email;
                this.contrasena=contrasena;
                this.telefono=telefono;
                this.tipoUsuario=tipoUsuario;
        }

}