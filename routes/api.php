<?php
/** @noinspection PhpMultipleClassDeclarationsInspection */

use App\Http\Controllers\Api\ApiCategoryController;
use App\Http\Controllers\Api\ApiItemController;
use App\Http\Controllers\Api\ApiUserLikeController;
use Illuminate\Support\Facades\Route;

Route::prefix('/api')->group(function () {
    Route::resource('/categories', ApiCategoryController::class);
    Route::resource('/items', ApiItemController::class);
    Route::resource('/user-likes', ApiUserLikeController::class);
});
