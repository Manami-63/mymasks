<?php

namespace Database\Factories;

use App\Enums\OrderStatus;
use App\Models\Order;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $users = User::all();

        if ($users->isEmpty()) {
            $user = User::factory()->create();
        } else {
            $user = $users->random();
        }

        return [
            "user_id" => $user->id,
            "status" =>  OrderStatus::PLACED
        ];
    }
}
