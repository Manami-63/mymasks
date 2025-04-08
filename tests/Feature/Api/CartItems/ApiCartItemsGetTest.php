<?php
/** @noinspection PhpUndefinedFieldInspection */
/** @noinspection PhpUnusedLocalVariableInspection */

namespace Feature\Api\CartItems;

use App\Models\CartItem;
use App\Models\User;
use App\Models\UserCart;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Laravel\Sanctum\Sanctum;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class ApiCartItemsGetTest extends TestCase
{
    use RefreshDatabase;
    use WithFaker;

    #[Test]
    public function canGetData()
    {
        $user = Sanctum::actingAs(User::factory()->create());

        $userCart = UserCart::factory()->create([
            'user_id' => $user->id
        ]);

        $rand = rand(1,10);

        $cartItems = CartItem::factory($rand)->create([
            'user_cart_id' => $userCart->id
        ]);

        $response = $this->get('/api/cart-items');

        $responseJson = json_decode($response->getContent(), true);

        $this->assertCount($rand, $responseJson['cartItems']);
        $this->assertEquals($cartItems[0]->id, $responseJson['cartItems'][0]['id']);
    }
}
