<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\OrderController;
use App\Http\Controllers\API\ItemController;
use App\Http\Controllers\API\UserController;

Route::get('/example', function () {
  return response()->json(['message' => 'API is working!']);
});

Route::prefix('v1')->group(function () {
    Route::get('orders', [OrderController::class, 'index']);
    Route::get('items', [ItemController::class, 'index']);
    Route::get('users', [UserController::class, 'index']);
    Route::get('orders/{id}', [OrderController::class, 'show']);
    Route::post('orders', [OrderController::class, 'store']);
    Route::delete('orders/{id}', [OrderController::class, 'destroy']);
    Route::put('orders/{id}/delivered', [OrderController::class, 'delivered']);
});