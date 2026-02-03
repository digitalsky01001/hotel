<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class TelegramService
{
    protected $botToken;
    protected $chatId;

    public function __construct()
    {
        $this->botToken = env('TELEGRAM_BOT_TOKEN');
        $this->chatId = env('TELEGRAM_CHAT_ID');
    }

    /**
     * Send booking notification to Telegram
     */
    public function sendBookingNotification($booking, $room)
    {
        if (!$this->botToken || !$this->chatId) {
            Log::warning('Telegram credentials not configured');
            return false;
        }

        $message = $this->formatBookingMessage($booking, $room);

        try {
            $response = Http::post("https://api.telegram.org/bot{$this->botToken}/sendMessage", [
                'chat_id' => $this->chatId,
                'text' => $message,
                'parse_mode' => 'HTML'
            ]);

            if ($response->successful()) {
                Log::info('Telegram notification sent successfully');
                return true;
            } else {
                Log::error('Failed to send Telegram notification', [
                    'response' => $response->body()
                ]);
                return false;
            }
        } catch (\Exception $e) {
            Log::error('Telegram notification error: ' . $e->getMessage());
            return false;
        }
    }

    /**
     * Format booking message for Telegram
     */
    protected function formatBookingMessage($booking, $room)
    {
        return "🏨 <b>НОВОЕ БРОНИРОВАНИЕ!</b>\n\n" .
               "📋 <b>Номер бронирования:</b> #{$booking->id}\n" .
               "🛏 <b>Номер:</b> {$room->name}\n" .
               "📂 <b>Тип:</b> {$room->type}\n" .
               "🎨 <b>Коллекция:</b> {$room->collection}\n\n" .
               "👤 <b>Гость:</b> {$booking->name}\n" .
               "📧 <b>Email:</b> {$booking->email}\n" .
               "📱 <b>Телефон:</b> {$booking->phone}\n\n" .
               "📅 <b>Заезд:</b> " . date('d.m.Y', strtotime($booking->check_in)) . "\n" .
               "📅 <b>Выезд:</b> " . date('d.m.Y', strtotime($booking->check_out)) . "\n" .
               "👥 <b>Гостей:</b> {$booking->guests}\n\n" .
               "💰 <b>Сумма:</b> " . number_format($booking->total_price, 0, ',', ' ') . " ₽\n" .
               "⏰ <b>Время:</b> " . now()->format('d.m.Y H:i');
    }

    /**
     * Send contact form notification to Telegram
     */
    public function sendContactFormNotification($data)
    {
        if (!$this->botToken || !$this->chatId) {
            return false;
        }

        $message = "📬 <b>НОВОЕ СООБЩЕНИЕ С САЙТА</b>\n\n" .
                   "👤 <b>Имя:</b> {$data['name']}\n" .
                   "📧 <b>Email:</b> {$data['email']}\n" .
                   "📱 <b>Телефон:</b> " . ($data['phone'] ?? 'не указан') . "\n" .
                   "📋 <b>Тема:</b> {$data['subject']}\n\n" .
                   "💬 <b>Сообщение:</b>\n{$data['message']}\n\n" .
                   "⏰ <b>Время:</b> " . now()->format('d.m.Y H:i');

        try {
            Http::post("https://api.telegram.org/bot{$this->botToken}/sendMessage", [
                'chat_id' => $this->chatId,
                'text' => $message,
                'parse_mode' => 'HTML'
            ]);
            return true;
        } catch (\Exception $e) {
            Log::error('Telegram contact form notification error: ' . $e->getMessage());
            return false;
        }
    }
}
