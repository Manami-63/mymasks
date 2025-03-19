<?php
/** @noinspection PhpUndefinedMethodInspection */
/** @noinspection PhpUndefinedVariableInspection */
/** @noinspection PhpMultipleClassDeclarationsInspection */

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Item;
use App\Models\UserLike;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ApiItemsController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Item::query()->with('brand');

        if ($request->has('orderBy')) {
            $orderBy = $request->input('orderBy');

            if ($orderBy == 'new') {
                $query->orderBy('created_at', 'desc');
            }

            if ($orderBy == 'popular') {
                $query->orderBy('num_likes', 'desc');
            }

            if ($orderBy == 'liked' && Auth::check()) {
                $userLikes = UserLike::where('user_id', Auth::id())->pluck('item_id')->toArray();

                $query->whereIn('id', $userLikes);
            }
        } else {
            $query->orderBy('id', 'desc');
        }

        if ($request->has('category')) {
            $categoryIdsArray = explode(',', $request->input('category'));

            $query->whereHas('itemCategories', function ($query) use ($categoryIdsArray) {
                $query->whereIn('category_id', $categoryIdsArray);
            }, '=', count($categoryIdsArray))->get();
        }

        if ($request->has('limit')) {
            $limit = $request->input('limit');

            $data = $query->take($limit)->get();
        } else {
            $data = $query->get();
        }

        $response = [
            'items' => $data
        ];

        return response()->json($response);
    }

    public function show(string $id): JsonResponse
    {
        $item = Item::query()->with(['brand', 'itemCategories.category'])->findOrFail($id);

        $itemsInCart = $item->cartItems()->sum('quantity');

        $item['itemsInCart'] = $itemsInCart;

        $response = [
            'item' => $item
        ];

        return response()->json($response);
    }
}
