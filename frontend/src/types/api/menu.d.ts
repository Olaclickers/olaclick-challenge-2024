export interface Menu {
  id: string;
  menu: string; 
  price: string; 
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
}

export interface ApiResponse {
  data: Menu[]; 
  meta: {
    page: number;
    limit: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
}