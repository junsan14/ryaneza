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
        /*
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
        });


*/

         Schema::create('users', function (Blueprint $table) {
            $table->id()->primary();
            $table->boolean('admin')->default(0);
            $table->string('username')->unique();
            $table->text('intro')->nullable();
            $table->string('password');
            $table->string('email')->unique();
            $table->string('icon')->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('country')->nullable();
            $table->string('gender')->nullable();
            $table->year('birth_year')->nullable();
            $table->string('locality_type')->nullable();
            $table->json('wishlist')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });
         
        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};
