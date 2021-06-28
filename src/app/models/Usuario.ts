export class Usuario {
    id: string;
    nombre: string;
    email: string;
    rol: string;
    bearer: string;

    constructor(item?: any) {
        // Nos va a llevar a la base de datos un string vacio que rellenará automáticamente
        this.id = item?.id ?? '';
        this.nombre = item?.nombre ?? '';
        this.email = item?.email ?? '';
        this.rol = item?.rol ?? '';
        this.bearer = item?.bearer ?? '';
    }
}