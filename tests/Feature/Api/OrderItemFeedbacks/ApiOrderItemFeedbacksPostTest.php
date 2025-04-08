<?php

namespace Feature\Api\OrderItemFeedbacks;

use App\Models\Item;
use App\Models\OrderItem;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Laravel\Sanctum\Sanctum;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class ApiOrderItemFeedbacksPostTest extends TestCase
{
    use RefreshDatabase;
    use WithFaker;

    #[Test]
    public function canPostData()
    {
        Sanctum::actingAs(User::factory()->create());

        $items = Item::factory()->create();

        $orderItem = OrderItem::factory()->create([
            'item_id' => $items->id,
        ]);

        $payload = [
            'orderItemId' => $orderItem->id,
            'name' => $this->faker->name,
            'feedback' => $this->faker->text,
            'rating' => $this->faker->numberBetween(1, 5),
        ];

        $response = $this->post('/api/order-item-feedbacks', $payload);

        $responseJson = json_decode($response->getContent(), true);

        $this->assertEquals($responseJson['orderItemFeedback']['name'], $payload['name']);
    }
}
