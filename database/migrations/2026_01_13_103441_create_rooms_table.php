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
        Schema::create('rooms', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('collection')->nullable(); // e.g., 'Вершины', 'Гармония', 'Минимализм'
            $table->text('description')->nullable();
            $table->decimal('price', 10, 2);
            $table->string('type'); // 'Люкс', 'Полулюкс', 'Стандарт'
            $table->json('amenities')->nullable();
            $table->json('images')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rooms');
    }
};
