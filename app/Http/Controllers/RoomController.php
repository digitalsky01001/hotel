<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class RoomController extends Controller
{
    public function index()
    {
        return \App\Models\Room::all();
    }

    public function show($id)
    {
        return \App\Models\Room::findOrFail($id);
    }
}
