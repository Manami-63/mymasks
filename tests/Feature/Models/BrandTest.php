<?php

namespace Feature\Models;

use App\Models\Brand;
use App\Models\Item;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class BrandTest extends TestCase
{
    use RefreshDatabase;

    public function testItems()
    {
        $brand = Brand::factory()->create();

        $item = Item::factory()->create([
            'brand_id' => $brand->id
        ]);

        $model = Item::with('brand')->find($item->id);

        $this->assertEquals($brand->id, $model->brand->id);
    }
}
