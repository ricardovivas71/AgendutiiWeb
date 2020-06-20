export class RegistrarUsuarioModel{
        nombres: string;
        apellidos: string;
        correo: string;
        contrasena: string;
        celular: string;
        tipoUsuario: boolean;

        constructor(nombres, apellidos, correo, contrasena, celular, tipoUsuario){
                this.nombres=nombres;
                this.apellidos=apellidos;
                this.correo=correo;
                this.contrasena=contrasena;
                this.celular=celular;
                this.tipoUsuario=tipoUsuario;
        }

}