<?php
// database/factories/OrderItemFactory.php

namespace Database\Factories;

use App\Models\OrderItem;
use App\Models\Order;
use App\Models\Item;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\OrderItem>
 */
class OrderItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'order_id' => Order::factory(), // Genera un pedido relacionado
            'item_id' => Item::factory(),   // Genera un ítem relacionado
            'quantity' => $this->faker->numberBetween(1, 10), // Cantidad aleatoria entre 1 y 10
        ];
    }
}
