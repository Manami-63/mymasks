<?php
/** @noinspection PhpUndefinedMethodInspection */

namespace Database\Seeders;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Item;
use App\Models\ItemCategory;
use App\Models\User;
use App\Models\UserLike;
use App\Services\UserLikesService;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $categoriesArray = ['daily', 'special', 'aging', 'dark spots', 'damage', 'weekly', 'acne'];

        foreach ($categoriesArray as $category) {
            Category::factory()->create(['name' => $category]);
        }

        Brand::factory()->count(10)->create();

        $categories = Category::all();

        $items = Item::factory()->count(30)
            ->create();

        $images = ['4015309_1227.jpg', '4393589_2981.jpg', '4393701_3081.jpg', '4393856_1233.jpg', null];

        foreach ($items as $item) {
            $selectedCategories = collect($categories)->random(3);

            $item->image = collect($images)->random();
            $item->save();

            foreach ($selectedCategories as $selectedCategory) {
                ItemCategory::factory()->create([
                    'item_id' => $item->id,
                    'category_id' => $selectedCategory->id,
                ]);
            }
        }

        User::factory()->create([
            'is_admin' => true,
        ]);

        $users = User::factory(5)->create();

        foreach ($users as $index => $user) {
            $likeCount = min($index, 4);

            $likedItems = $items->random($likeCount);

            foreach ($likedItems as $item) {
                $userLike = UserLike::create([
                    'user_id' => $user->id,
                    'item_id' => $item->id
                ]);
                UserLikesService::updateNumLikes($userLike);
            }
        }

    }
}
