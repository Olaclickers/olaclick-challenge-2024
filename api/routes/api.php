<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('clients', 'App\Http\Controllers\ClientController');
Route::apiResource('items', 'App\Http\Controllers\ItemController');
Route::apiResource('orders', 'App\Http\Controllers\OrderController');
Route::apiResource('order-statuses', 'App\Http\Controllers\OrderStatusController');
Route::post('orders/{order}/send', 'App\Http\Controllers\OrderController@send');
Route::post('orders/{order}/delivered', 'App\Http\Controllers\OrderController@delivered');
Route::post('orders/{order}/cancel', 'App\Http\Controllers\OrderController@cancel');

