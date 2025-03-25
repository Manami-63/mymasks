<?php

namespace App\Console\Commands\Command;

use App\Enums\Category;
use App\Models\ItemCategory;
use Illuminate\Console\Command;
use Illuminate\Support\Arr;

class TestCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:test-command';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {

//        $random = Arr::random(Category::cases(),3);

        $itemCategory = ItemCategory::with('category')->find(1);

        dd($itemCategory);
    }
}
