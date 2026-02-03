<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('category'); // spa, dining, sport, concierge
            $table->string('title');
            $table->text('description'); // Short description for cards
            $table->text('detailed_description'); // Long detailed text
            $table->string('image'); // Main hero image
            $table->json('gallery')->nullable(); // Array of additional images
            $table->string('price')->nullable();
            $table->json('features')->nullable(); // List of standard features
            $table->string('schedule')->nullable(); // Working hours
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('services');
    }
};
