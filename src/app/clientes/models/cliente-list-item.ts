// esta clase nos permite mostrar los datos que nos interesan en la tabla
export class ClienteListItem {
   id: string;
    nombre: string;
    dni: string;    
    telefono: number;    
    estadoCivilDesc: string;

    constructor(item?: any) {
        this.id = item?.id ?? '';
        this.nombre = item?.nombre ?? '';
        this.dni = item?.dni ?? '';
        this.telefono = item?.telefono ?? '';
        this.estadoCivilDesc = item?.estadoCivilDesc ?? '';
    }
}