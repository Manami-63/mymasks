<?php /** @noinspection PhpUnusedParameterInspection */

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\JsonResponse;

class ApiCategoryController extends Controller
{
    public function index(): JsonResponse
    {
        $data = Category::all();

        $response = [
            'categories' => $data
        ];

        return response()->json($response);
    }
}
