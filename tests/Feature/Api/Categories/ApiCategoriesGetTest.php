<?php

namespace Feature\Api\Categories;

use App\Models\Category;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class ApiCategoriesGetTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function canGetData()
    {
        $rand = rand(10,20);

        $categories = Category::factory($rand)->create();

        $response = $this->get('/api/categories');

        $responseJson = json_decode($response->getContent(), true);

        $this->assertCount($rand, $responseJson['categories']);
        $this->assertEquals($categories[0]->id, $responseJson['categories'][0]['id']);
    }
}
