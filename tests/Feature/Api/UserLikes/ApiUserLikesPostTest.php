<?php
/** @noinspection PhpUndefinedFieldInspection */

namespace Feature\Api\UserLikes;

use App\Models\Item;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Laravel\Sanctum\Sanctum;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class ApiUserLikesPostTest extends TestCase
{
    use RefreshDatabase;
    use WithFaker;

    #[Test]
    public function canPostData()
    {
        $user = Sanctum::actingAs(User::factory()->create());

        $item = Item::factory()->create();

        $payload = [
            'itemId' => $item->id,
        ];

        $response = $this->post('/api/user-likes', $payload);

        $responseJson = json_decode($response->getContent(), true);

        $this->assertEquals($responseJson['userLike']['user_id'], $user->id);
        $this->assertEquals($responseJson['userLike']['item_id'], $payload['itemId']);
    }
}
