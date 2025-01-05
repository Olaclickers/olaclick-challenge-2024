export interface Order {
    id: number;
    cliente: string;
    estado: string;
    detalle: string;
    total: number;
    productos: {
      item: string;
      descripcion: string;
      cantidad: number;
      unitario: number;
      total: number;
    }[];
  }
  