<?php

namespace Database\Factories;

use App\Models\Item;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\OrderItemFeedback;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<OrderItemFeedback>
 */
class OrderItemFeedbackFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $orderItems = OrderItem::all();

        if ($orderItems->isEmpty()) {
            $orderItem = OrderItem::factory()->create();
        } else {
            $orderItem = $orderItems->random();
        }

        return [
            "order_item_id" => $orderItem->id,
            "name" => $this->faker->name(),
            "feedback" => $this->faker->text(),
            "rating" => $this->faker->numberBetween(1,5)
        ];
    }
}
