<?php

namespace App\Listeners;

use App\Enums\OrderStatus;
use App\Events\OrderItemFeedbackWasCreated;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\OrderItemFeedback;

class HandleOrderItemFeedbackWasCreatedEvent
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(OrderItemFeedbackWasCreated $event): void
    {
        $orderItem = OrderItem::find($event->orderItemFeedback->order_item_id);

        if (!$orderItem) {
            return;
        }

        $orderItemIds = OrderItem::where('order_id', $orderItem->order_id)->pluck('id')->toArray();

        $feedbackCount = OrderItemFeedback::whereIn('order_item_id', $orderItemIds)->count();

        if ($feedbackCount === count($orderItemIds)) {
            Order::where('id', $orderItem->order_id)->update(['status' => OrderStatus::DONE]);
        }
    }
}
