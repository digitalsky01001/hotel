<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    protected $fillable = [
        'room_id', 
        'name', 
        'email', 
        'phone', 
        'check_in', 
        'check_out', 
        'guests',
        'total_price',
        'status'
    ];

    public function room()
    {
        return $this->belongsTo(Room::class);
    }
}
