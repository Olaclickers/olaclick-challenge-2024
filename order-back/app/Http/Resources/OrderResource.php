<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
      return [
        'id' => $this->id,
        'user' => [
            'id' => $this->user->id,
            'name' => $this->user->name,
            'last_name' => $this->user->last_name,
        ],
        'items' => $this->items->map(function ($item) {
            return [
                'id' => $item->id,
                'name' => $item->name,
                'price' => $item->price,
                'quantity' => $item->pivot->quantity,
            ];
        }),
        'total' => $this->total,
        'status' => $this->status,
      ];
    }
}
