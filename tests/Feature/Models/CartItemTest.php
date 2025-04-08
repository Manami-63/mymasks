<?php

namespace Feature\Models;

use App\Models\CartItem;
use App\Models\Item;
use App\Models\UserCart;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CartItemTest extends TestCase
{
    use RefreshDatabase;

    public function testUserCart()
    {
        $userCart = UserCart::factory()->create();

        $cartItem = CartItem::factory()->create([
            'user_cart_id' => $userCart->id,
        ]);

        $model = CartItem::with('userCart')->find($cartItem->id);

        $this->assertEquals($userCart->id, $model->userCart->id);
    }

    public function testItem()
    {
        $item = Item::factory()->create();

        $cartItem = CartItem::factory()->create([
            'item_id' => $item->id,
        ]);

        $model = CartItem::with('item')->find($cartItem->id);

        $this->assertEquals($item->id, $model->item->id);
    }
}
