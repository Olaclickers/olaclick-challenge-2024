export interface SideDish {
  id: string;
  side_dishes: string; 
  price: string; 
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
}

export interface SideDishApiResponse {
  data: SideDish[]; 
  meta: {
    page: number;
    limit: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
}