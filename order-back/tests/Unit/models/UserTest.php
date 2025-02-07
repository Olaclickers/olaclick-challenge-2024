<?php
namespace Tests\Unit;

use App\Models\User;
use App\Models\Order;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function user_has_many_orders()
    {
      $user = User::factory()->create();
  
      $orders = Order::factory()->count(3)->create(['user_id' => $user->id]);

      $user->load('orders');

      foreach ($orders as $order) {
          $this->assertTrue($user->orders->contains($order));
      }

      $this->assertCount(3, $user->orders);
    }
}
