<?php

namespace Database\Factories;

use App\Models\Item;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<OrderItem>
 */
class OrderItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $orders = Order::all();

        if ($orders->isEmpty()) {
            $order = Order::factory()->create();
        } else {
            $order = $orders->random();
        }

        $items = Item::all();

        if ($items->isEmpty()) {
            $item = Item::factory()->create();
        } else {
            $item = $items->random();
        }

        return [
            "order_id" =>$order->id,
            "item_id" => $item->id,
            "quantity" => $this->faker->numberBetween(1,10),
            "price" => $this->faker->numberBetween(3,100),
        ];
    }
}
