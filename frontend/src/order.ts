export interface Order {
  id?: number;
  customerName: string;  // Changed from customer
  totalPrice: number;
  status: 'initiated' | 'sent' | 'delivered';
  details?: string;
}