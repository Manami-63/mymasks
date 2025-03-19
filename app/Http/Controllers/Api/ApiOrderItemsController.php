<?php
/** @noinspection PhpUndefinedMethodInspection */
/** @noinspection PhpMultipleClassDeclarationsInspection */

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ApiOrderItemsController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'order_id' => 'required|integer|exists:orders,id',
            'item_id' => 'required|integer|exists:items,id',
            'quantity' => 'required|integer',
            'price' => 'required|decimal:2',
        ]);

        $order = Order::findOrFail($validated['order_id']);

        $validated['order_id'] = $order->id;

        $orderItem = new OrderItem();
        $orderItem->fill($validated);
        $orderItem->save();

        $response = [
            'orderItem' => $orderItem,
            'responseCode' => 200
        ];

        return response()->json($response);
    }
}
