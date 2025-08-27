<?php
namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Item;
use App\Http\Resources\ItemResource;

class ItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
      $items = cache()->remember('items', 300, function () {
        return Item::all();
      });
    
      return ItemResource::collection($items);
    }
}
