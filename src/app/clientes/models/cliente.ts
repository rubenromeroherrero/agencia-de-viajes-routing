// este modelo nos permite editar los campos de cliente
export class Cliente {
    id: string;
    nombre: string;
    apellidos: string;
    email: string;
    dni: string;    
    telefono: number;    
    estadoCivilId: number;
    direccion: string;
    fechaNacimiento: Date | null;

    constructor(item?: any) {
        this.id = item?.id ?? '';
        this.nombre = item?.nombre ?? '';
        this.apellidos = item?.apellidos ?? '';
        this.email = item?.email ?? '';
        this.dni = item?.dni ?? '';
        this.telefono = item?.telefono ?? '';
        this.estadoCivilId = item?.estadoCivilId ?? 99;
        this.direccion = item?.direccion ?? '';
        // nos la convierte a formato fecha
        this.fechaNacimiento = item?.fechaNacimiento ? new Date(item.fechaNacimiento): null;
    }
}

