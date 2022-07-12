export interface Producto {
    id_producto: number;
    nombre: string;
    talla: string;
    observaciones: string;
    id_marca: string;
    cantidadInventario: number;
    fechaEmbarque: Date;
}