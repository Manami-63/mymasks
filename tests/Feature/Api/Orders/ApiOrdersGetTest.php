<?php
/** @noinspection PhpUndefinedFieldInspection */

namespace Feature\Api\Orders;

use App\Models\Order;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Laravel\Sanctum\Sanctum;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class ApiOrdersGetTest extends TestCase
{
    use RefreshDatabase;
    use WithFaker;

    #[Test]
    public function canGetData()
    {
        $user = Sanctum::actingAs(User::factory()->create());

        $order = Order::factory()->create([
            'user_id' => $user->id
        ]);

        $response = $this->get('/api/orders');

        $responseJson = json_decode($response->getContent(), true);

        $this->assertEquals($order->id, $responseJson['orders'][0]['id']);
        $this->assertCount(1, $responseJson['orders']);
    }
}
