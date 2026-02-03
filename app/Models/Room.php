<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    protected $fillable = ['name', 'type', 'price', 'description', 'amenities', 'images'];

    protected $casts = [
        'amenities' => 'array',
        'images' => 'array',
    ];
}
