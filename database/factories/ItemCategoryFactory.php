<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Item;
use App\Models\ItemCategory;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<ItemCategory>
 */
class ItemCategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $items = Item::all();

        if ($items->isEmpty()) {
            $item = Item::factory()->create();
        } else {
            $item = $items->random();
        }

        $categories = Category::all();

        if ($categories->isEmpty()) {
            $category = 'special';
        } else {
            $category = $categories->random();
        }

        return [
            'item_id' => $item->id,
            'category_id' => $category->id,
        ];
    }
}
