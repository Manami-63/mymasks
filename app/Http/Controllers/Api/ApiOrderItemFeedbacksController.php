<?php
/** @noinspection PhpUndefinedMethodInspection */
/** @noinspection PhpUndefinedFieldInspection */
/** @noinspection PhpMultipleClassDeclarationsInspection */

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\OrderItem;
use App\Models\OrderItemFeedback;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ApiOrderItemFeedbacksController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $data = [];

        if ($request->has('itemId')) {
            $orderItems = OrderItem::where('item_id', $request->input('itemId'))->pluck('id');

            $data = OrderItemFeedback::query()->whereIn('order_item_id', $orderItems)->get();
        }

        $response = [
            'feedbacks' => $data
        ];

        return response()->json($response);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'orderItemId' => 'required|integer|exists:order_items,id',
            'name' => 'required|string|max:255',
            'feedback' => 'required|string',
            'rating' => 'required|between:1,5',
        ]);

        $orderItem = OrderItem::find($validated['orderItemId']);

        $orderItemFeedback = new OrderItemFeedback();
        $orderItemFeedback->order_item_id = $orderItem->id;
        $orderItemFeedback->name = $validated['name'];
        $orderItemFeedback->feedback = $validated['feedback'];
        $orderItemFeedback->rating = $validated['rating'];

        $orderItemFeedback->save();

        $response = [
            'orderItemFeedback' => $orderItemFeedback,
            'responseCode' => 200
        ];

        return response()->json($response);
    }
}
