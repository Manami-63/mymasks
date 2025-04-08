<?php
/** @noinspection PhpUndefinedFieldInspection */

namespace Feature\Api\OrderItems;

use App\Models\Item;
use App\Models\Order;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Laravel\Sanctum\Sanctum;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class ApiOrderItemsPostTest extends TestCase
{
    use RefreshDatabase;
    use WithFaker;

    #[Test]
    public function canPostData()
    {
        $user = Sanctum::actingAs(User::factory()->create());

        $order = Order::factory()->create([
            'user_id' => $user->id
        ]);

        $item = Item::factory()->create();

        $payload = [
            'order_id' => $order->id,
            'item_id' => $item->id,
            'quantity' => $this->faker->numberBetween(1, 10),
            'price' => $this->faker->randomFloat(2,10.00,30.00),
        ];

        $response = $this->post('/api/order-items', $payload);

        $responseJson = json_decode($response->getContent(), true);

        $this->assertEquals($responseJson['orderItem']['item_id'], $payload['item_id']);
    }
}
