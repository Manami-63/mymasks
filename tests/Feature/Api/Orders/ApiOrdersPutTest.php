<?php
/** @noinspection PhpUndefinedFieldInspection */

namespace Feature\Api\Orders;

use App\Enums\OrderStatus;
use App\Models\Order;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Event;
use Laravel\Sanctum\Sanctum;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class ApiOrdersPutTest extends TestCase
{
    use RefreshDatabase;
    use WithFaker;

    #[Test]
    public function canPutData()
    {
        Event::fake();

        $user = Sanctum::actingAs(User::factory()->create());

        $order = Order::factory()->create([
            'user_id' => $user->id
        ]);

        $statuses = OrderStatus::cases();

        $rand = rand(0, (count($statuses) - 1));

        $payload = [
            'status' => $statuses[$rand]->value,
        ];

        $response = $this->put('/api/orders/' . $order->id, $payload);

        $responseJson = json_decode($response->getContent(), true);

        $this->assertEquals($responseJson['order']['status'], $payload['status']);
    }
}
