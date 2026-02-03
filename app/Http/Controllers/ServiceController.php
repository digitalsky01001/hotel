<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ServiceController extends Controller
{
    public function index()
    {
        return response()->json(\App\Models\Service::all());
    }

    public function show($slug)
    {
        return response()->json(\App\Models\Service::where('slug', $slug)->firstOrFail());
    }
}
