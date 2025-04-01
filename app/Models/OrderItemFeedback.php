<?php
/** @noinspection PhpUnused */

namespace App\Models;

use App\Events\OrderItemFeedbackWasCreated;
use Database\Factories\OrderItemFeedbackFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OrderItemFeedback extends Model
{
    /** @use HasFactory<OrderItemFeedbackFactory> */
    use HasFactory;

    protected $dispatchesEvents = [
        'created' => OrderItemFeedbackWasCreated::class,
    ];

    public function orderItem(): BelongsTo
    {
        return $this->belongsTo(OrderItem::class);
    }
}
