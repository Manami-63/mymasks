<?php
/** @noinspection PhpUndefinedMethodInspection */
/** @noinspection PhpMultipleClassDeclarationsInspection */

use App\Http\Controllers\ProfileController;
use App\Models\Item;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    if (Auth::check()) {
        return redirect('/dashboard');
    } else {
        return Inertia::render('Welcome', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
        ]);
    }
})->name('top');

Route::get('/items', function (Request $request) {
    $orderBy = $request->query('orderBy');
    $sortBy = $request->query('sortBy');

    return Inertia::render('ItemsPage', ['orderBy' => $orderBy, 'sortBy' => $sortBy]);
})->name('items');

Route::get('/item/{id}', function ($id) {
    $item = Item::find($id);

    if (!$item) {
        return redirect('/');
    }
    return Inertia::render('ItemPage', ['itemId' => $id, 'itemName' => $item->name]);
})->name('item');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});



require __DIR__ . '/auth.php';
require __DIR__ . '/api.php';
