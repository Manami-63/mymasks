<?php
/** @noinspection PhpUndefinedFieldInspection */
/** @noinspection PhpUndefinedMethodInspection */
/** @noinspection PhpMultipleClassDeclarationsInspection */

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\UserLike;
use App\Services\UserLikesService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ApiUserLikeController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $userLike = null;

        if ($request->has('itemId')) {
            $itemId = $request->input('itemId');

            $userLike = UserLike::where('item_id', $itemId)->where('user_id', auth()->id())->first();
        }

        $response = [
            'userLike' => $userLike
        ];

        return response()->json($response);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'itemId' => 'required|integer|exists:items,id',
        ]);

        $userLike = UserLike::where('item_id', $validated['itemId'])->where('user_id', auth()->id())->first();

        if (!$userLike) {
            $userLike = new UserLike();
            $userLike->item_id = $validated['itemId'];
            $userLike->user_id = Auth::id();
            $userLike->save();

            UserLikesService::updateNumLikes($userLike);
        }

        $response = [
            'userLike' => $userLike
        ];

        return response()->json($response);
    }

    public function destroy($id): JsonResponse
    {
        $userLike = UserLike::where('user_id', Auth::id())->find($id);

        if ($userLike) {
            $userLike->delete();

            UserLikesService::updateNumLikes($userLike);
        }

        $response = [
            'userLike' => null,
            'responseCode' => 200
        ];

        return response()->json($response);
    }
}
