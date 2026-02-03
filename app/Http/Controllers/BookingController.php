<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Models\Booking;
use App\Models\Room;
use Carbon\Carbon;

class BookingController extends Controller
{
    /**
     * Check room availability for given dates
     */
    public function checkAvailability(Request $request)
    {
        $validated = $request->validate([
            'room_id' => 'required|exists:rooms,id',
            'check_in' => 'required|date|after_or_equal:today',
            'check_out' => 'required|date|after:check_in',
        ]);

        $checkIn = Carbon::parse($validated['check_in']);
        $checkOut = Carbon::parse($validated['check_out']);

        // Check for overlapping bookings
        $conflicts = Booking::where('room_id', $validated['room_id'])
            ->where(function ($query) use ($checkIn, $checkOut) {
                $query->whereBetween('check_in', [$checkIn, $checkOut])
                    ->orWhereBetween('check_out', [$checkIn, $checkOut])
                    ->orWhere(function ($q) use ($checkIn, $checkOut) {
                        $q->where('check_in', '<=', $checkIn)
                          ->where('check_out', '>=', $checkOut);
                    });
            })
            ->exists();

        return response()->json([
            'available' => !$conflicts,
            'message' => $conflicts 
                ? 'Номер занят на выбранные даты' 
                : 'Номер доступен для бронирования'
        ]);
    }

    /**
     * Store a new booking
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'room_id' => 'required|exists:rooms,id',
            'check_in' => 'required|date|after_or_equal:today',
            'check_out' => 'required|date|after:check_in',
            'guests' => 'required|integer|min:1|max:6',
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'total_price' => 'required|numeric|min:0',
        ]);

        $checkIn = Carbon::parse($validated['check_in']);
        $checkOut = Carbon::parse($validated['check_out']);

        // Double-check availability
        $conflicts = Booking::where('room_id', $validated['room_id'])
            ->where(function ($query) use ($checkIn, $checkOut) {
                $query->whereBetween('check_in', [$checkIn, $checkOut])
                    ->orWhereBetween('check_out', [$checkIn, $checkOut])
                    ->orWhere(function ($q) use ($checkIn, $checkOut) {
                        $q->where('check_in', '<=', $checkIn)
                          ->where('check_out', '>=', $checkOut);
                    });
            })
            ->exists();

        if ($conflicts) {
            return response()->json([
                'success' => false,
                'message' => 'К сожалению, номер уже забронирован на выбранные даты'
            ], 409);
        }

        // Create booking
        $booking = Booking::create($validated);

        // Get room details for response
        $room = Room::find($validated['room_id']);

        // Send Telegram notification
        try {
            $telegramService = new \App\Services\TelegramService();
            $telegramService->sendBookingNotification($booking, $room);
        } catch (\Exception $e) {
            Log::error('Failed to send Telegram notification: ' . $e->getMessage());
            // Don't fail the booking if Telegram fails
        }

        Log::info('New Booking Created:', [
            'booking_id' => $booking->id,
            'room' => $room->name,
            'guest' => $validated['name'],
            'dates' => $checkIn->format('d.m.Y') . ' - ' . $checkOut->format('d.m.Y')
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Бронирование успешно создано!',
            'booking' => [
                'id' => $booking->id,
                'room_name' => $room->name,
                'check_in' => $checkIn->format('d.m.Y'),
                'check_out' => $checkOut->format('d.m.Y'),
                'guests' => $validated['guests'],
                'total_price' => $validated['total_price']
            ]
        ], 201);
    }

    /**
     * Get all bookings (optional - for admin)
     */
    public function index()
    {
        $bookings = Booking::with('room')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($bookings);
    }
}
