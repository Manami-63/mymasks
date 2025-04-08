<?php
/** @noinspection PhpMultipleClassDeclarationsInspection */

use App\Http\Controllers\Api\ApiCartItemsController;
use App\Http\Controllers\Api\ApiCategoriesController;
use App\Http\Controllers\Api\ApiItemsController;
use App\Http\Controllers\Api\ApiOrderItemFeedbacksController;
use App\Http\Controllers\Api\ApiOrdersController;
use App\Http\Controllers\Api\ApiOrderItemsController;
use App\Http\Controllers\Api\ApiUserLikesController;
use Illuminate\Support\Facades\Route;

Route::prefix('/api')->group(function () {
    Route::resource('/categories', ApiCategoriesController::class);
    Route::resource('/items', ApiItemsController::class);
    Route::get('/order-item-feedbacks', [ApiOrderItemFeedbacksController::class, 'index']);

    Route::middleware(['auth:sanctum'])->group(function () {
        Route::resource('/cart-items', ApiCartItemsController::class);
        Route::resource('/order-items', ApiOrderItemsController::class);
        Route::resource('/orders', ApiOrdersController::class);
        Route::resource('/user-likes', ApiUserLikesController::class);
        Route::post('/order-item-feedbacks', [ApiOrderItemFeedbacksController::class, 'store']);
    });
});
