<?php
/** @noinspection PhpMultipleClassDeclarationsInspection */

use App\Http\Controllers\Api\ApiCartItemsController;
use App\Http\Controllers\Api\ApiCategoryController;
use App\Http\Controllers\Api\ApiItemController;
use App\Http\Controllers\Api\ApiUserLikeController;
use Illuminate\Support\Facades\Route;

Route::prefix('/api')->group(function () {
    Route::resource('/categories', ApiCategoryController::class);
    Route::resource('/items', ApiItemController::class);

    Route::middleware(['auth:sanctum'])->group(function () {
        Route::resource('/cart-items', ApiCartItemsController::class);
        Route::resource('/user-likes', ApiUserLikeController::class);
    });
});
