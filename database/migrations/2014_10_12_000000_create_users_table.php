<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('firstname');
            $table->string('lastname')->nullable();
            $table->string('phone')->nullable();
            $table->longText('address')->nullable();
            $table->date('renewal_visa')->nullable();
            $table->enum('gender', ['male', 'female'])->default('male');
            $table->string('payment_per_hour')->nullable();
            $table->string('worker_id')->nullable();
            $table->longText('skill')->nullable();
            $table->enum('status', [0, 1])->default(0);
            $table->string('passcode');
            $table->string('password');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
