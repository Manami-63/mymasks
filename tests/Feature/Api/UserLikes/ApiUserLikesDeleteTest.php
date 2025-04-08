<?php
/** @noinspection PhpUndefinedFieldInspection */
/** @noinspection PhpUnusedLocalVariableInspection */

namespace Feature\Api\UserLikes;

use App\Models\Item;
use App\Models\User;
use App\Models\UserLike;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Laravel\Sanctum\Sanctum;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class ApiUserLikesDeleteTest extends TestCase
{
    use RefreshDatabase;
    use WithFaker;

    #[Test]
    public function canDeleteData()
    {
        $user = Sanctum::actingAs(User::factory()->create());

        $item = Item::factory()->create();

        $userLike = UserLike::factory()->create([
            'user_id' => $user->id,
            'item_id' => $item->id
        ]);

        $response = $this->delete('/api/user-likes/' . $userLike->id);

        $responseJson = json_decode($response->getContent(), true);

        $this->assertSoftDeleted($userLike);
    }
}
