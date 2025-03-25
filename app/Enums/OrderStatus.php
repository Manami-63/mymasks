<?php

namespace App\Enums;

enum OrderStatus: string
{
    case CREATING = 'creating';
    case PLACED = 'placed';
    case SHIPPED = 'shipped';
    case DELIVERED = 'delivered';
    case DONE = 'done';
    case CANCELLED = 'cancelled';
    case REJECTED = 'rejected';
}
