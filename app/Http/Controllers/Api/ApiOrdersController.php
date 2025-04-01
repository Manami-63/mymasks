<?php
/** @noinspection PhpUndefinedMethodInspection */
/** @noinspection PhpMultipleClassDeclarationsInspection */
/** @noinspection PhpUndefinedFieldInspection */

namespace App\Http\Controllers\Api;

use App\Enums\OrderStatus;
use App\Events\OrderWasCreated;
use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class ApiOrdersController extends Controller
{
    public function index(): JsonResponse
    {
        $data = Order::with(['orderItems.item.brand', 'orderItems.orderItemFeedback'])->where('user_id', Auth::id())->get();

        $response = [
            'orders' => $data
        ];

        return response()->json($response);
    }

    public function store(): JsonResponse
    {
        $order = new Order();
        $order->user_id = Auth::id();
        $order->status = OrderStatus::CREATING;
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
            'status' => [Rule::enum(OrderStatus::class), 'required', 'string'],
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
