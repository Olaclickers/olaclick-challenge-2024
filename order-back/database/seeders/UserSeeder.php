<?php

namespace Database\Seeders;

use App\Models\User;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
      //
      User::create([
          'name' => 'John',
          'last_name' => 'Doe',
          'type' => 'client',
      ]);

      User::create([
          'name' => 'Jane',
          'last_name' => 'Smith',
          'type' => 'provider',
      ]);

      User::create([
          'name' => 'Carlos',
          'last_name' => 'Smith',
          'type' => 'client',
      ]);

      User::create([
          'name' => 'Laura',
          'last_name' => 'Gómez',
          'type' => 'provider',
      ]);
    }
}
