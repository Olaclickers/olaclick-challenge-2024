<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Order;
use App\Models\Item;
use App\Models\OrderDetail;

class OrderDetailSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Order::all()->each(function ($order) {
            $items = Item::inRandomOrder()->take(rand(1, 5))->get();
            $qty = rand(1, 5);


            foreach ($items as $item) {
                OrderDetail::create([
                    'order_id' => $order->id,
                    'item_id' => $item->id,
                    'description' => $item->description,
                    'quantity' => $qty,
                    'unit_price' => $item->unit_price,
                    //'total_price' => $item->unit_price * $qty,
                ]);
            }
        });
    }
}
