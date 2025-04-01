<?php

namespace App\Enums;

enum OrderStatus: string
{
    case CANCELLED = 'cancelled';
    case CREATING = 'creating';
    case DELIVERED = 'delivered';
    case DONE = 'done';
    case PLACED = 'placed';
    case REJECTED = 'rejected';
    case SHIPPED = 'shipped';
}
