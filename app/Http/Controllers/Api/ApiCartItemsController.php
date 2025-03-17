<?php
/** @noinspection PhpMultipleClassDeclarationsInspection */
/** @noinspection PhpUndefinedFieldInspection */
/** @noinspection PhpUndefinedMethodInspection */

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CartItem;
use App\Models\UserCart;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ApiCartItemsController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'itemId' => 'required|integer|exists:items,id',
            'quantity' => 'required|integer',
        ]);

        $userCart = UserCart::firstOrCreate([
            'user_id' => Auth::id()
        ]);

        $cartItem = new CartItem();
        $cartItem->user_cart_id = $userCart->id;
        $cartItem->item_id = $validated['itemId'];
        $cartItem->quantity = $validated['quantity'];

        $cartItem->save();

        $response = [
            'cartItem' => $cartItem,
            'responseCode' => 200
        ];

        return response()->json($response);
    }

}
