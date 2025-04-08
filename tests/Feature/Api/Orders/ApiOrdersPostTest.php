<?php

namespace Feature\Api\Orders;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Laravel\Sanctum\Sanctum;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class ApiOrdersPostTest extends TestCase
{
    use RefreshDatabase;
    use WithFaker;

    #[Test]
    public function canPostData()
    {
        $user = Sanctum::actingAs(User::factory()->create());

        $response = $this->post('/api/orders');

        $responseJson = json_decode($response->getContent(), true);

        $this->assertEquals($responseJson['order']['user_id'], $user->id);
    }
}
