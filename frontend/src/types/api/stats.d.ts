export interface Stats {
    total_users: number;
    total_menu: number;
    total_side_dishes: number;
    total_drinks: number;
    most_sold_menu: {
      menuName: string;
      id: string;
      name: string;
      total_sold: number;
    };
    most_sold_side_dish: {
      sideDishesName: string;
      id: string;
      name: string;
      total_sold: number;
    };
  }