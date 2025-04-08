<?php

namespace Feature\Api\OrderItemFeedbacks;

use App\Models\Item;
use App\Models\OrderItem;
use App\Models\OrderItemFeedback;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class ApiOrderItemFeedbacksGetTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function canGetData()
    {
        $items = Item::factory()->create();

        $rand = rand(5,20);

        $orderItems = OrderItem::factory($rand)->create([
            'item_id' => $items->id,
        ]);

        foreach ($orderItems as $orderItem) {
            OrderItemFeedback::factory()->create([
                'order_item_id' => $orderItem->id,
            ]);
        }

        $response = $this->get('/api/order-item-feedbacks?itemId='.$items->id);

        $responseJson = json_decode($response->getContent(), true);

        $this->assertCount($rand, $responseJson['feedbacks']);
        $this->assertEquals($responseJson['feedbacks'][0]['order_item_id'], $orderItems[0]->id);
    }
}
