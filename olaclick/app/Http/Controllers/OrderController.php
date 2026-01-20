<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index(){
        $orders = Order::where('status', '!=', Order::DELIVERED_STATUS)
        ->orderBy("id","desc")
        ->paginate(10);
        
        return view('orders.index', compact('orders'));
    }

    public function show($id){
        $order = Order::findOrFail($id);
        return view('orders.show', compact('order'));
    }
}