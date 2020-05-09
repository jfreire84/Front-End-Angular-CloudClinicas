import { Tratamiento } from './tratamiento';

export class ItemFactura {

    
    cantidad: number = 1;
    tratamiento: Tratamiento;
    importe: number;

    //Método para calcular el importe.
    

  public calcularImporte(): number {
    return this.cantidad * this.tratamiento.precio;
  }

}
