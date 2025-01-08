<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        \App\Models\Client::insert([
            ['name' => 'José José'],
            ['name' => 'Juan Perez'],
            ['name' => 'Andrés']
        ]);

        \App\Models\OrderStatus::insert([
            [ 'name' => 'Iniciado' ],
            [ 'name' => 'Enviado' ],
            [ 'name' => 'Entregado' ]
        ]);

        \App\Models\Item::insert([
            [
                'name' => 'Pollo a al brasa',
                'price' => 120.00,
            ],
            [
                'name' => 'Ensalada cesar',
                'price' => 100.00,
            ],
            [
                'name' => 'Coca cola',
                'price' => 40.00,
            ],
            [
                'name' => 'Lomo saltado',
                'price' => 60.00,
            ],
            [
                'name' => 'Chicha morada',
                'price' => 30.00,
            ]
        ]);
    }
}
