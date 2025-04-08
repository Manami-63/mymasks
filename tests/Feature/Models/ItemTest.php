<?php

namespace Feature\Models;

use App\Models\CartItem;
use App\Models\Item;
use App\Models\ItemCategory;
use App\Models\UserLike;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ItemTest extends TestCase
{
    use RefreshDatabase;
    public function testBrand()
    {
        $item = Item::factory()->create();

        $model = Item::with('brand')->find($item->id);

        $this->assertEquals($model->brand->id, $item->brand->id);
    }

    public function testUserLikes()
    {
        $item = Item::factory()->create();

        $userLikes = UserLike::factory()->create([
            'item_id' => $item->id,
        ]);

        $model = Item::with('userLikes')->find($item->id);

        $this->assertEquals($model->userLikes[0]->id, $userLikes->id);
    }

    public function testItemCategories()
    {
        $item = Item::factory()->create();

        $itemCategory = ItemCategory::factory()->create([
            'item_id' => $item->id,
        ]);

        $model = Item::with('itemCategories')->find($item->id);

        $this->assertEquals($model->itemCategories[0]->id, $itemCategory->id);
    }

    public function testCartItems()
    {
        $item = Item::factory()->create();

        $cartItem = CartItem::factory()->create([
            'item_id' => $item->id,
        ]);

        $model = Item::with('cartItems')->find($item->id);

        $this->assertEquals($model->cartItems[0]->id, $cartItem->id);
    }
}
