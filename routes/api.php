<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/rooms', [\App\Http\Controllers\RoomController::class, 'index']);
Route::get('/rooms/{id}', [\App\Http\Controllers\RoomController::class, 'show']);

// Booking routes
Route::post('/bookings/check-availability', [\App\Http\Controllers\BookingController::class, 'checkAvailability']);
Route::post('/bookings', [\App\Http\Controllers\BookingController::class, 'store']);
Route::get('/bookings', [\App\Http\Controllers\BookingController::class, 'index']);

// Services routes
Route::get('/services', [\App\Http\Controllers\ServiceController::class, 'index']);
Route::get('/services/{slug}', [\App\Http\Controllers\ServiceController::class, 'show']);
