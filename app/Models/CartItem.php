<?php
/** @noinspection PhpUnused */

namespace App\Models;

use Database\Factories\CartItemFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class CartItem extends Model
{
    /** @use HasFactory<CartItemFactory> */
    use HasFactory, SoftDeletes;

    public function userCart(): BelongsTo
    {
        return $this->belongsTo(UserCart::class);
    }

    public function item(): BelongsTo
    {
        return $this->belongsTo(Item::class);
    }
}
