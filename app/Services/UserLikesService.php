<?php
/** @noinspection PhpUndefinedFieldInspection */
/** @noinspection PhpUndefinedMethodInspection */

namespace App\Services;

use App\Models\Item;
use App\Models\UserLike;

class UserLikesService
{
    public static function updateNumLikes(UserLike $userLike): void
    {
        $item = Item::find($userLike->item_id);

        $numLikes = UserLike::where('item_id', $item->id)->count();

        $item->update(['num_likes' => $numLikes]);
    }
}
