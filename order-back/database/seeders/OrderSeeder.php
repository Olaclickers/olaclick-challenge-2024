<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Order;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $user1 = User::first(); // Asegúrate de tener al menos un usuario insertado antes

        Order::create([
            'user_id' => $user1->id,
            'total' => 100.50,
            'status' => 'started',
        ]);

        Order::create([
            'user_id' => $user1->id,
            'total' => 200.00,
            'status' => 'sent',
        ]);

        Order::create([
            'user_id' => $user1->id,
            'total' => 50.25,
            'status' => 'delivered',
        ]);

        Order::create([
            'user_id' => $user1->id,
            'total' => 75.00,
            'status' => 'started',
        ]);
    }
}
