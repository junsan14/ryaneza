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
        Schema::create('bistros', function (Blueprint $table) {
            $table->id();
            $table->integer('author');
            $table->string('name')->unique();
            $table->string('description')->nullable();
            $table->integer('province');
            $table->integer('district')->nullable();
            $table->integer('sector')->nullable();
            $table->string('address')->nullable();
            $table->json('google_map')->nullable();
            $table->string('opening_hour')->nullable();
            $table->string('mobile')->nullable();
            $table->string('email')->nullable();
            $table->integer('genre')->nullable();
            $table->integer('style')->nullable();
            $table->json('occasion')->nullable();
            $table->json('ambience')->nullable();
            $table->json('speciality')->nullable();
            $table->json('time_occasion')->nullable();
            $table->integer('dietary_restriction')->nullable();
            $table->string('thumbnail_image')->nullable();
            $table->json('kv_images')->nullable();
            $table->json('interior_slides')->nullable();
            $table->json('food_slides')->nullable();
            $table->json('menu_images')->nullable();
            $table->string('seats_number')->nullable();
            $table->integer('min_price')->nullable();
            $table->integer('max_price')->nullable();
            $table->json('payment_options')->nullable();
            $table->integer('reservation')->nullable();
            $table->string('keywords')->nullable();
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {

    }
};
