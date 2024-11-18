<?php
namespace Tests\Unit;

use App\Models\Item;
use App\Models\Order;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class OrderTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function order_can_have_many_items()
    {
        // Crear un usuario
        $user = User::factory()->create();
        
        // Crear una orden
        $order = Order::factory()->create(['user_id' => $user->id]);

        // Crear algunos items
        $item1 = Item::factory()->create();
        $item2 = Item::factory()->create();

        // Asociar los items a la orden con cantidad
        $order->items()->attach($item1->id, ['quantity' => 2]);
        $order->items()->attach($item2->id, ['quantity' => 3]);

        // Verificar que los items estén asociados a la orden
        $this->assertTrue($order->items->contains($item1));
        $this->assertTrue($order->items->contains($item2));

        // Verificar las cantidades correctas en el pivote
        $pivot1 = $order->items()->where('item_id', $item1->id)->first()->pivot;
        $pivot2 = $order->items()->where('item_id', $item2->id)->first()->pivot;

        $this->assertEquals(2, $pivot1->quantity);
        $this->assertEquals(3, $pivot2->quantity);
    }
}
