<?php

namespace Feature\Models;

use App\Models\OrderItemFeedback;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class OrderItemFeedbackTest extends TestCase
{
    use RefreshDatabase;

    public function testOrderItem()
    {
        $orderItemFeedback = OrderItemFeedback::factory()->create();

        $model = OrderItemFeedback::with('orderItem')->find($orderItemFeedback->id);

        $this->assertEquals($orderItemFeedback->order_item_id, $model->orderItem->id);
    }
}
