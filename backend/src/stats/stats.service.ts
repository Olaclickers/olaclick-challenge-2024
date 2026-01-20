import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { MenuService } from 'src/menu/menu.service';
import { SideDishesService } from 'src/side-dishes/side-dishes.service';
import { DrinksService } from 'src/drinks/drinks.service';
import { OrderService } from 'src/order/order.service';
import { OrderStatus } from 'src/order/dto/create-order.dto';

@Injectable()
export class StatsService {
  constructor(
    private readonly userService: UsersService,
    private readonly menuService: MenuService,
    private readonly sideDishService: SideDishesService,
    private readonly drinkService: DrinksService,
    private readonly orderService: OrderService,
  ) {}
  async getTotalUsers() {
    const users = await this.userService.findAllUSer();
    return {
      total_users: users,
    };
  }

  async getTotalMenuItems() {
    const menu = await this.menuService.findAllMenu();
    return {
      total_menu: menu,
    };
  }

  async getTotalSideDishes() {
    const sale_dishes = await this.sideDishService.findAllSaleDishes();
    return {
      total_sale_dishes: sale_dishes,
    };
  }

  async getTotalDrinks() {
    const drinks = await this.drinkService.findAllDrinks();
    return {
      total_drinks: drinks,
    };
  }

  async getMostSoldMenuItem() {
    const orders = await this.orderService.findAllOrders();

    // Filtrar solo las órdenes con estados válidos (excluye "cancelado")
    const validOrders = orders.filter((order) => order.status === OrderStatus.FACTURADO);

    // Mapear y contar ventas por menú
    const menuSales = new Map<string, { menuName: string; totalSold: number }>();

    validOrders.forEach((order) => {
      const menuId = order.menu_id;
      const menuName = order.menu.menu; // Nombre del menú
      const quantity = order.quantity_menu;

      if (menuSales.has(menuId)) {
        menuSales.get(menuId)!.totalSold += quantity;
      } else {
        menuSales.set(menuId, { menuName, totalSold: quantity });
      }
    });

    // Encontrar el menú más vendido
    const mostSoldMenu = [...menuSales.entries()].reduce((max, entry) => (entry[1].totalSold > max.totalSold ? entry[1] : max), {
      menuName: '',
      totalSold: 0,
    });

    return {
      most_sold_menu: mostSoldMenu,
    };
  }

  async getMostSoldSideDish() {
    const orders = await this.orderService.findAllOrders();

    // Filtrar solo órdenes facturadas
    const validOrders = orders.filter((order) => order.status === OrderStatus.FACTURADO);

    // Contar la cantidad total vendida por cada side dish
    const sideDishCount = validOrders.reduce(
      (acc, order) => {
        const sideDishId = order.side_dishes_id;
        if (sideDishId) {
          acc[sideDishId] = (acc[sideDishId] || 0) + order.quantity_side_dishes;
        }
        return acc;
      },
      {} as Record<string, number>,
    );

    // Encontrar el side dish más vendido
    const mostSoldSideDishId = Object.keys(sideDishCount).reduce((maxId, id) => (sideDishCount[id] > (sideDishCount[maxId] || 0) ? id : maxId), '');

    // Obtener detalles del side dish más vendido
    const mostSoldSideDish = orders.find((order) => order.side_dishes_id === mostSoldSideDishId)?.sideDishes || null;

    return {
      most_sold_side_dish: {
        sideDishesName: mostSoldSideDish?.side_dishes || null,
        totalSold: sideDishCount[mostSoldSideDishId] || 0,
      },
    };
  }
}
