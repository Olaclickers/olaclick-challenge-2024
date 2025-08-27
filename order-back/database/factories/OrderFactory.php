<?php
// database/factories/OrderFactory.php

namespace Database\Factories;

use App\Models\Order;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(), // Genera un usuario relacionado
            'total' => $this->faker->randomFloat(2, 10, 1000), // Total entre 10 y 1000
            'status' => $this->faker->randomElement(['started', 'sent', 'delivered']),
        ];
    }
}
