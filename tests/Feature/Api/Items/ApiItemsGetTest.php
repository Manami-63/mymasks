<?php

namespace Feature\Api\Items;

use App\Models\Item;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class ApiItemsGetTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function canGetData()
    {
        $rand = rand(10,50);

        $items = Item::factory($rand)->create();

        $response = $this->get('/api/items');

        $responseJson = json_decode($response->getContent(), true);

        $this->assertCount($rand, $responseJson['items']);
        $this->assertEquals($items[$rand - 1]->id, $responseJson['items'][0]['id']);
    }

    #[Test]
    public function canGetASingleData()
    {
        $item = Item::factory()->create();

        $response = $this->get('/api/items/'.$item->id);

        $responseJson = json_decode($response->getContent(), true);

        $this->assertEquals($item->id, $responseJson['item']['id']);
    }
}
