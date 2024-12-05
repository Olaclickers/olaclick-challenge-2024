export interface Details {
  product: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: number;
  details: Details[];
  client: string;
  status: string;
  image?: string;
}
export const ordersData: Order[] = [
  {
    id: 1,
    details: [
      { product: "Pizza Margarita", quantity: 1, price: 12.99 },
      { product: "Ensalada César", quantity: 2, price: 8.5 },
      { product: "Refresco", quantity: 1, price: 2.5 },
    ],
    client: "Juan Pérez",
    status: "iniciado",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    details: [
      { product: "Hamburguesa Clásica", quantity: 2, price: 9.99 },
      { product: "Papas Fritas", quantity: 1, price: 4.5 },
    ],
    client: "Ana Gómez",
    status: "enviado",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    details: [
      { product: "Sushi Variado", quantity: 1, price: 18.99 },
      { product: "Té Verde", quantity: 2, price: 3.0 },
    ],
    client: "Carlos Ruiz",
    status: "entregado",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 4,
    details: [
      { product: "Tacos al Pastor", quantity: 3, price: 6.99 },
      { product: "Guacamole", quantity: 1, price: 4.0 },
    ],
    client: "Luisa Martínez",
    status: "iniciado",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 5,
    details: [
      { product: "Espagueti Carbonara", quantity: 1, price: 14.99 },
      { product: "Pan de Ajo", quantity: 2, price: 3.5 },
    ],
    client: "Pedro Gómez",
    status: "enviado",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 6,
    details: [
      { product: "Pollo Asado", quantity: 1, price: 15.99 },
      { product: "Puré de Papas", quantity: 1, price: 5.5 },
      { product: "Ensalada Mixta", quantity: 1, price: 7.0 },
    ],
    client: "María López",
    status: "entregado",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 7,
    details: [
      { product: "Pizza Cuatro Quesos", quantity: 1, price: 13.99 },
      { product: "Refresco Grande", quantity: 1, price: 3.0 },
    ],
    client: "Jorge Fernández",
    status: "iniciado",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 8,
    details: [
      { product: "Sopa de Tomate", quantity: 2, price: 6.5 },
      { product: "Pan Integral", quantity: 1, price: 2.0 },
    ],
    client: "Laura Méndez",
    status: "enviado",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 9,
    details: [
      { product: "Burrito de Pollo", quantity: 1, price: 8.99 },
      { product: "Nachos con Queso", quantity: 1, price: 5.99 },
    ],
    client: "Alberto Ramírez",
    status: "iniciado",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 10,
    details: [
      { product: "Arroz Chaufa", quantity: 1, price: 11.99 },
      { product: "Té Helado", quantity: 1, price: 2.5 },
    ],
    client: "Sofía Castro",
    status: "entregado",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 11,
    details: [
      { product: "Lomo Saltado", quantity: 1, price: 13.99 },
      { product: "Chicha Morada", quantity: 1, price: 3.0 },
    ],
    client: "Luis Flores",
    status: "iniciado",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 12,
    details: [
      { product: "Wrap Vegetariano", quantity: 1, price: 9.5 },
      { product: "Smoothie de Fresa", quantity: 1, price: 4.5 },
    ],
    client: "Isabel Ruiz",
    status: "enviado",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 13,
    details: [
      { product: "Chaufa de Mariscos", quantity: 1, price: 17.99 },
      { product: "Jugo de Piña", quantity: 1, price: 3.5 },
    ],
    client: "Andrés García",
    status: "entregado",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 14,
    details: [
      { product: "Hamburguesa Vegana", quantity: 1, price: 12.99 },
      { product: "Batido de Mango", quantity: 1, price: 4.5 },
    ],
    client: "Valeria Torres",
    status: "iniciado",
    image: "https://via.placeholder.com/150",
  },
];
