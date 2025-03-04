export interface Sale {
    id: string;
    order_id: string; 
    sale_date: string; 
    total_amount: number; 
    deleted_at?: string | null; 
  }