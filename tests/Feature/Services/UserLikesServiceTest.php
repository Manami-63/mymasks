<?php
/** @noinspection PhpUndefinedFieldInspection */
/** @noinspection PhpUndefinedMethodInspection */
/** @noinspection PhpUnusedLocalVariableInspection */

namespace Feature\Services;

use App\Models\Item;
use App\Models\User;
use App\Models\UserLike;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class UserLikesServiceTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    function updateNumLikesOnCreation()
    {
        Sanctum::actingAs(User::factory()->create());

        $item = Item::factory()->create([
            'num_likes' => 0
        ]);

        $payload = ['itemId' => $item->id];

        $response = $this->post('/api/user-likes', $payload);

        $itemAfterUserLikeCreated = Item::find($item->id);

        $this->assertEquals(1, $itemAfterUserLikeCreated->num_likes);
    }

    #[Test]
    function updateNumLikesOnDeletion()
    {
        $user = Sanctum::actingAs(User::factory()->create());

        $item = Item::factory()->create();

        $rand = rand(5, 10);
        $randomUsers = User::factory($rand)->create();

        foreach ($randomUsers as $randomUser) {
            UserLike::factory()->create([
                'user_id' => $randomUser->id,
                'item_id' => $item->id,
            ]);
        }

        $userLike = UserLike::factory()->create([
            'user_id' => $user->id,
            'item_id' => $item->id
        ]);

        $response = $this->delete('/api/user-likes/' . $userLike->id);

        $itemAfterUserLikeCreated = Item::find($item->id);

        $this->assertEquals($rand, $itemAfterUserLikeCreated->num_likes);
    }
}
