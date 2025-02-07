<?php

namespace Tests\Feature;

use App\Models\Order;
use App\Models\User;
use App\Models\Item;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class OrderControllerTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    /** @test */
    public function testIndex()
    {
        $order1 = Order::factory()->create(['status' => 'started']);
        $order2 = Order::factory()->create(['status' => 'sent']);
        $order3 = Order::factory()->create(['status' => 'delivered']);

        $response = $this->get('api/v1/orders');
        $response->assertStatus(200);
        $response->assertJsonCount(2, 'data');
    }

    /** @test */
    public function testShow()
    {
        $user = User::factory()->create();
        $item = Item::factory()->create();
        $order = Order::factory()->create([
            'status' => 'started',
            'user_id' => $user->id,
        ]);
        $order->items()->attach($item->id, ['quantity' => 2]);
        $order->load(['items', 'user']);
        $response = $this->json('GET', '/api/v1/orders/' . $order->id);
    
        $response->assertStatus(200);
        $response->assertJsonFragment(['id' => $order->id]);
    }


    /** @test */
    public function testStore()
    {
        $user = User::factory()->create();
        $data = [
            'status' => 'started',
            'user_id' => $user->id,
            'total' => 100.50
        ];

        $response = $this->json('POST', '/api/v1/orders', $data);
        $response->assertStatus(201);
    }
}
