<?php

namespace Feature\Models;

use App\Models\User;
use App\Models\UserLike;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserTest extends TestCase
{
    use RefreshDatabase;

    public function testUserLikes()
    {
        $userLike = UserLike::factory()->create();

        $model = User::with('userLikes')->find($userLike->user_id);

        $this->assertInstanceOf(UserLike::class, $model->userLikes[0]);
        $this->assertEquals($userLike->id, $model->userLikes[0]->id);
    }
}
