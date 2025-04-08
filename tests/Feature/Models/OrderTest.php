<?php

namespace Feature\Models;

use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class OrderTest extends TestCase
{
    use RefreshDatabase;

    public function testOrderItems()
    {
        $orderItem = OrderItem::factory()->create();

        $model = Order::with('orderItems')->find($orderItem->order_id);

        $this->assertEquals($model->orderItems[0]->id, $orderItem->id);
    }
}
