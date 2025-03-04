export interface Order {
    id: string;
    user_dni: string; 
    client_dni: string; 
    menu_id: string; 
    side_dishes_id?: string[]; 
    drinks_id?: string[]; 
    quantity: number; 
    status: 'iniciado' | 'enviado' | 'entregado' | 'cancelado' | 'facturado'; 
    deleted_at?: string | null; 
  }