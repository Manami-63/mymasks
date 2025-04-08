<?php

namespace Feature\Models;

use App\Models\CartItem;
use App\Models\UserCart;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserCartTest extends TestCase
{
    use RefreshDatabase;

    public function testUser()
    {
        $userCart = UserCart::factory()->create();

        $model = UserCart::with('user')->find($userCart->id);

        $this->assertEquals($model->user, $userCart->user);
    }

    public function testCartItems()
    {
        $cartItem = CartItem::factory()->create();

        $model = UserCart::with('cartItems')->find($cartItem->user_cart_id);

        $this->assertEquals($model->cartItems[0]->id, $cartItem->id);
    }
}
