<?php
namespace Tests\Unit;

use App\Models\Item;
use App\Models\User;
use App\Models\Order;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ItemTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_can_create_an_item()
    {
        $item = Item::create([
            'name' => 'Item de prueba',
            'description' => 'Descripción del item de prueba',
            'price' => 19.99,
        ]);

        $this->assertDatabaseHas('items', [
            'name' => 'Item de prueba',
            'description' => 'Descripción del item de prueba',
            'price' => 19.99
        ]);
    }

    /** @test */
    public function item_can_have_many_orders()
    {
      $user = User::factory()->create();

      $item = Item::create([
          'name' => 'Item de prueba',
          'description' => 'Descripción del item de prueba',
          'price' => 19.99,
      ]);

      $orders = Order::factory()
          ->count(3)
          ->create(['user_id' => $user->id]);

      $item->orders()->attach($orders->pluck('id'), ['quantity' => 1]);
      $this->assertCount(3, $item->orders);
        foreach ($orders as $order) {
            $this->assertTrue($order->items->contains($item));
        }
    }

   
}
