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
            $table->integer('author_id');
            $table->string('situation')->nullable();
            $table->double('food_rate',2,1)->nullable();
            $table->double('service_rate',2,1)->nullable();
            $table->double('ambience_rate',2,1)->nullable();
            $table->double('value_rate',2,1)->nullable();
            $table->double('convenience_rate',2,1)->nullable();
            $table->double('uniqueness_rate',2,1)->nullable();
            $table->double('overall_rate',2,2)->nullable();
            $table->date('visited_date')->nullable();
            $table->integer('howmany')->nullable();
            $table->integer('cost')->nullable();
            $table->text('comment')->nullable();
            $table->json('picture')->nullable();
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
