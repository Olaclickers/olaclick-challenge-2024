<?php

namespace Database\Seeders;

use App\Models\Item;
use App\Models\Order;
use App\Models\OrderItem;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OrderItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $order1 = Order::first();  // Asegúrate de que haya al menos una orden insertada
        $item1 = Item::first();    // Asegúrate de que haya al menos un item insertado

        OrderItem::create([
            'order_id' => $order1->id,
            'item_id' => $item1->id,
            'quantity' => 2,
        ]);

        OrderItem::create([
            'order_id' => $order1->id,
            'item_id' => $item1->id,
            'quantity' => 1,
        ]);

        $order2 = Order::skip(1)->first();  // Obtiene la segunda orden
        $item2 = Item::skip(1)->first();    // Obtiene el segundo item

        OrderItem::create([
            'order_id' => $order2->id,
            'item_id' => $item2->id,
            'quantity' => 3,
        ]);

        OrderItem::create([
            'order_id' => $order2->id,
            'item_id' => $item2->id,
            'quantity' => 4,
        ]);
    }
}
