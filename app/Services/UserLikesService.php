<?php
/** @noinspection PhpUndefinedFieldInspection */
/** @noinspection PhpUndefinedMethodInspection */

namespace App\Services;

use App\Models\Item;
use App\Models\UserLike;
use Feature\Services\UserLikesServiceTest;

class UserLikesService
{
    /**
     * @param UserLike $userLike
     * @return void
     * @see UserLikesServiceTest::updateNumLikes()
     */
    public static function updateNumLikes(UserLike $userLike): void
    {
        $item = Item::find($userLike->item_id);

        $numLikes = UserLike::where('item_id', $item->id)->count();

        $item->update(['num_likes' => $numLikes]);
    }
}
