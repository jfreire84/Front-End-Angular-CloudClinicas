import { ItemFactura } from './item-factura';
import { Paciente } from 'src/app/paciente/paciente';

export class Facturas {

    id: number;
    descripcion: string;
    observacion: string;
    fechaCreacionFac: string;
    lineasFactura: Array<ItemFactura> = [];
    paciente: Paciente;
    totalImporteFactura: number;

}
