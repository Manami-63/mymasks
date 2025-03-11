<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ApiCategoryController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $data = Category::all();

        $response = [
            'categories' => $data
        ];

        return response()->json($response);
    }
}
