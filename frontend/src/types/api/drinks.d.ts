export interface Drink {
  id: string;
  drinks: string; 
  price: string; 
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
}

export interface DrinkApiResponse {
  data: Drink[]; 
  meta: {
    page: number;
    limit: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
}