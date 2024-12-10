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
            $table->string('google_map')->nullable();
            $table->string('opening_hour')->nullable();
            $table->string('mobile')->nullable();
            $table->string('email')->nullable();
            $table->integer('genre')->nullable();
            $table->integer('style')->nullable();
            $table->integer('speciality')->nullable();
            $table->integer('occasion')->nullable();
            $table->json('time_occasion')->nullable();
            $table->integer('dietary_restriction')->nullable();
            $table->string('thumbnail')->nullable();
            $table->string('point01_picture')->nullable();
            $table->string('point01_remarks')->nullable();
            $table->string('point02_picture')->nullable();
            $table->string('point02_remarks')->nullable();
            $table->string('point03_picture')->nullable();
            $table->string('point03_remarks')->nullable();
            $table->string('point04_picture')->nullable();
            $table->string('point04_remarks')->nullable();
            $table->integer('min_price')->nullable();
            $table->integer('max_price')->nullable();
            $table->json('payment_options')->nullable();
            $table->integer('reservation')->nullable();
            $table->json('keywords')->nullable();
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
