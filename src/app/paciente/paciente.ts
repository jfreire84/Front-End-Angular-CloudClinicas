import { Facturas } from '../facturas/modelo/facturas';

export class Paciente {

    id: number;
    nombre: string;
    apellidos: string;
    email: string;
    fechanac: string;
    fecha: string;
    historial: string;

    //Creamos la relacion con la tabla facturas creando un array para almacenar las facturas
    facturas: Array<Facturas> = [];
 

}