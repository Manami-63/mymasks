<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\UserCart;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<UserCart>
 */
class UserCartFactory extends Factory
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
            'user_id' => $user->id,
        ];
    }
}
