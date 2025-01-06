<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // return datatable of orders
        if ($request->id) {
            return Order::with('client', 'status', 'items')
                ->where('order_status_id', '!=', 3)
                ->where('id', $request->id)
                ->paginate(10);
        }
        if ($request->page) {
            return Order::with('client', 'status', 'items')
                ->where('order_status_id', '!=', 3)
                ->orderBy('created_at', 'asc')
                ->paginate(10);
        }
        return Order::with('client', 'status')->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //validate request
        $rules = [
            'client_id' => 'required|integer',
            'total' => 'required',
            'items' => 'required|array',
            'items.*.id' => 'required|integer',
            'items.*.quantity' => 'required|integer',
        ];

        $this->validate($request, $rules);

        try {
            DB::beginTransaction();
            $order = Order::create($request->all());
            //save order items
            foreach ($request->items as $item) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'item_id' => $item['id'],
                    'quantity' => $item['quantity'],
                    'price' => $item['price'],
                ]);
            }
            DB::commit();
            return response()->json($order, 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        return $order->load('client', 'status', 'items');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order $order)
    {
        //validate request
        $rules = [
            'client_id' => 'required|integer',
            'order_status_id' => 'required|integer',
            'total' => 'required|decimal',
            'items' => 'required|array',
            'items.*.item_id' => 'required|integer',
            'items.*.quantity' => 'required|integer',
        ];

        $this->validate($request, $rules);

        try {
            $order->update($request->all());
            $order->items()->delete();
            $order->items()->createMany($request->items);
            return response()->json($order, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        //
    }

    /**
     * Send the order to the client.
     */
    public function send(Order $order)
    {
        // send order to client update status to 2
        $order->update(['order_status_id' => 2]);
        return response()->json(['message' => 'Order sent'], 200);
    }

    /**
     * Mark the order as delivered.
     */
    public function delivered(Order $order)
    {
        // mark order as delivered update status to 3
        $order->update(['order_status_id' => 3]);
        return response()->json(['message' => 'Order delivered'], 200);
    }

    /**
     * Mark the order as canceled.
     */
    public function cancel(Order $order)
    {
        // delete order
        $order->delete();
        return response()->json(['message' => 'Order canceled'], 200);
    }
}
