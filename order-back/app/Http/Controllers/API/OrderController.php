<?php
namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Order;
use App\Models\Item;
use App\Models\OrderItem;
use App\Http\Resources\OrderResource;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
      $orders = Order::enabled()->get();
      return OrderResource::collection($orders);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
      $data = $request->all();
      $data['status'] = $data['status'] ?? 'started';
      $order = Order::create($data);

      if (isset($data['items'])) {
        foreach ($data['items'] as $itemData) {
          $product = Item::find($itemData['productId']);
          if ($product) {
              OrderItem::create([
                'order_id' => $order->id,
                'item_id' => $product->id,
                'quantity' => $itemData['quantity'],
              ]);
          } else {
              return response()->json(['error' => 'Producto no encontrado'], 404);
          }
        }
      }
      return new OrderResource($order);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
      $order = Order::with(['items', 'user'])->findOrFail($id);
      return new OrderResource($order);
    }

    public function delivered(string $id)
    {
      $order = $this->findOrderById($id); 
      $order->update(['status' => 'delivered']);
      return new OrderResource($order);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
      $order = $this->findOrderById($id); 
      if (!$order) {
          return response()->json(['message' => 'Orden no encontrada'], 404);
      }
      $order->delete();
      return response()->json(['message' => 'Orden eliminada con éxito'], 200);
    }

    private function findOrderById($id)
    {
        return Order::findOrFail($id);
    }

}
