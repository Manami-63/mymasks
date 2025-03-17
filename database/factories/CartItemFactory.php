<?php

namespace Database\Factories;

use App\Models\Item;
use App\Models\UserCart;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CartItem>
 */
class CartItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $userCarts = UserCart::all();

        if ($userCarts->isEmpty()) {
            $useCart = UserCart::factory()->create();
        } else {
            $useCart = $userCarts->random();
        }

        $items = Item::all();

        if ($items->isEmpty()) {
            $item = Item::factory()->create();
        } else {
            $item = $items->random();
        }

        return [
            'user_cart_id' => $useCart->id,
            'item_id' => $item->id,
            'quantity' => $this->faker->numberBetween(1, 10),
        ];
    }
}
