<?php

namespace Feature\Models;

use App\Models\Item;
use App\Models\ItemCategory;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ItemCategoryTest extends TestCase
{
    use RefreshDatabase;

    public function testItem()
    {
        $item = Item::factory()->create();

        $itemCategory = ItemCategory::factory()->create([
            'item_id' => $item->id,
        ]);

        $model = ItemCategory::with('item')->find($itemCategory->id);

        $this->assertInstanceOf(Item::class, $model->item);
        $this->assertEquals($item->id, $model->item->id);
    }

    public function testCategory()
    {
        $itemCategory = ItemCategory::factory()->create();

        $model = ItemCategory::with('category')->find($itemCategory->id);

        $this->assertEquals($itemCategory->category_id, $model->category->id);
    }
}
