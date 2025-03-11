<?php

namespace Database\Factories;

use App\Models\Item;
use App\Models\User;
use App\Models\UserLike;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<UserLike>
 */
class UserLikeFactory extends Factory
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

        $items = Item::all();

        if ($items->isEmpty()) {
            $item = 'special';
        } else {
            $item = $items->random();
        }

        return [
            'user_id' => $user->id,
            'item_id' => $item->id,
        ];
    }
}
