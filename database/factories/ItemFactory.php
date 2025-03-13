<?php

namespace Database\Factories;

use App\Models\Brand;
use App\Models\Item;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Arr;

/**
 * @extends Factory<Item>
 */
class ItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $brands = Brand::all();

        if (count($brands) == 0) {
            $brand = Brand::factory()->create();
        } else {
            $brand = $brands->random();
        }

        $numSheetArray = [1, 2, 3, 5, 7, 10, 15, 30];

        $numSheet = Arr::random($numSheetArray);

        return [
            'name' => fake()->name(),
            'brand_id' => $brand->id,
            'details' => fake()->text(),
            'product_number' => fake()->name . fake()->numberBetween(1000, 2000),
            'image' => null,
            'price' => fake()->numberBetween(5, 200),
            'sheet_per_packet' => $numSheet,
            'stock' => fake()->numberBetween(0, 100),
        ];
    }
}
