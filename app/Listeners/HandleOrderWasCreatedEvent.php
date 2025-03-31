<?php /** @noinspection PhpUndefinedMethodInspection */

namespace App\Listeners;

use App\Events\OrderWasCreated;
use App\Models\CartItem;
use App\Models\UserCart;

class HandleOrderWasCreatedEvent
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(OrderWasCreated $event): void
    {
        $userCart = UserCart::where('user_id', $event->order->user_id)->first();

        CartItem::where('user_cart_id', $userCart->id)->delete();

        $userCart->delete();
    }
}
