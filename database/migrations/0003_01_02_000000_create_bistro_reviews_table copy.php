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
        Schema::create('bistro_reviews', function (Blueprint $table) {
            $table->id();
            $table->integer('bistro_id');
            $table->string('situation')->nullable();
            $table->integer('food_rate')->nullable();
            $table->integer('service_rate')->nullable();
            $table->integer('ambience')->nullable();
            $table->integer('value_rate')->nullable();
            $table->integer('convenience_rate')->nullable();
            $table->integer('uniqueness_rate')->nullable();
            $table->integer('overall_rate')->nullable();
            $table->integer('rate')->nullable();
            $table->date('visited')->nullable();
            $table->text('comment')->nullable();
            $table->string('picuture01')->nullable();
            $table->string('picuture02')->nullable();
            $table->string('picuture03')->nullable();
            $table->string('picuture04')->nullable();
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
