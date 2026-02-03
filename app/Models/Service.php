<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    protected $fillable = [
        'slug', 'category', 'title', 'description', 
        'detailed_description', 'image', 'gallery', 
        'price', 'features', 'schedule'
    ];

    protected $casts = [
        'gallery' => 'array',
        'features' => 'array'
    ];
}
