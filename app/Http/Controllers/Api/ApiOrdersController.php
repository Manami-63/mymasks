<?php
/** @noinspection PhpUndefinedFieldInspection */

namespace App\Http\Controllers\Api;

use App\Events\OrderWasCreated;
use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ApiOrdersController extends Controller
{
    public function store(): JsonResponse
    {
        $order = new Order();
        $order->user_id = Auth::id();
        $order->status = 'creating';
        $order->save();

        $response = [
            'order' => $order,
            'responseCode' => 200
        ];

        return response()->json($response);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $validated = $request->validate([
            'status' => 'required|string',
        ]);

        $order = Order::find($id);
        $order->status = $validated['status'];
        $order->save();

        OrderWasCreated::dispatch($order);

        $response = [
            'order' => $order,
            'responseCode' => 200
        ];

        return response()->json($response);
    }
}
