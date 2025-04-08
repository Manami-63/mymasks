<?php

namespace Feature\Models;

use App\Models\Item;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\OrderItemFeedback;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class OrderItemTest extends TestCase
{
    use RefreshDatabase;

    public function testOrder()
    {
        $orderItem = OrderItem::factory()->create();

        $model = OrderItem::with('order')->find($orderItem->id);

        $this->assertInstanceOf(Order::class, $model->order);
        $this->assertEquals($model->order->id, $orderItem->order_id);
    }

    public function testItem()
    {
        $orderItem = OrderItem::factory()->create();

        $model = OrderItem::with('item')->find($orderItem->id);

        $this->assertInstanceOf(Item::class, $model->item);
        $this->assertEquals($model->item->id, $orderItem->item_id);
    }

    public function testOrderItemFeedback()
    {
        $orderItemFeedback = OrderItemFeedback::factory()->create();

        $model = OrderItem::with('orderItemFeedback')->find($orderItemFeedback->order_item_id);

        $this->assertEquals($model->orderItemFeedback->id, $orderItemFeedback->id);
    }
}
