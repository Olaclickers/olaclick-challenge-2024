<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Order;
use App\Models\Client;
use App\Models\OrderDetail;
use App\Models\Item;

class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        /*Order::factory()
            ->count(20)
            ->create();*/
        Order::factory()->count(20)->create()->each(function ($order) {
            $items = Item::inRandomOrder()->take(rand(1, 5))->get();
            $totalOrderPrice = 0;

            foreach ($items as $item) {
                $quantity = rand(1, 5);
                $orderDetail = OrderDetail::create([
                    'order_id' => $order->id,
                    'item_id' => $item->id,
                    'description' => $item->description,
                    'quantity' => $quantity,
                    'unit_price' => $item->unit_price,
                    'total_price' => $quantity * $item->unit_price,
                ]);

                $totalOrderPrice += $orderDetail->total_price;
            }

            $order->update(['total_price' => $totalOrderPrice]);
        });
    }
}
