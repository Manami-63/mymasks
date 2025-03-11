<?php

namespace App\Models;

use Database\Factories\UserLikeFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class UserLike extends Model
{
    /** @use HasFactory<UserLikeFactory> */
    use HasFactory, SoftDeletes;
}
