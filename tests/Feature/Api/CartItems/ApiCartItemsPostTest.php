<?php
/** @noinspection PhpUndefinedFieldInspection */
/** @noinspection PhpUnusedLocalVariableInspection */

namespace Feature\Api\CartItems;

use App\Models\Item;
use App\Models\User;
use App\Models\UserCart;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Laravel\Sanctum\Sanctum;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class ApiCartItemsPostTest extends TestCase
{
    use RefreshDatabase;
    use WithFaker;

    #[Test]
    public function canPostData()
    {
        $user = Sanctum::actingAs(User::factory()->create());

        $userCart = UserCart::factory()->create([
            'user_id' => $user->id
        ]);

        $item = Item::factory()->create();

        $payload = [
            'itemId' => $item->id,
            'quantity' => $this->faker->numberBetween(1, 10),
        ];

        $response = $this->post('/api/cart-items', $payload);

        $responseJson = json_decode($response->getContent(), true);

        $this->assertEquals($responseJson['cartItem']['item_id'], $payload['itemId']);
    }
}
