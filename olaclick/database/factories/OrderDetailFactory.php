<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Order;
use App\Models\Item;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\OrderDetail>
 */
class OrderDetailFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $item = Item::inRandomOrder()->first();
        $quantity = fake()->numberBetween(1, 5);

        return [
            'order_id' => Order::inRandomOrder()->first()->id,  // assign random order
            'item_id' => $item->id,
            'description' => $item->description,
            'quantity' => $quantity,
            'unit_price' => $item->unit_price,
            'total_price' => $quantity * $item->unit_price,
        ];
    }
}
