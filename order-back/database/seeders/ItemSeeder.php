<?php

namespace Database\Seeders;

use App\Models\Item;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
      Item::create([
          'name' => 'Item 1',
          'description' => 'Description for Item 1',
          'price' => 20.99,
      ]);

      Item::create([
          'name' => 'Item 2',
          'description' => 'Description for Item 2',
          'price' => 45.50,
      ]);

      Item::create([
          'name' => 'Item 3',
          'description' => 'Description for Item 3',
          'price' => 30.00,
      ]);

      Item::create([
          'name' => 'Item 4',
          'description' => 'Description for Item 4',
          'price' => 55.75,
      ]);
    }
}
