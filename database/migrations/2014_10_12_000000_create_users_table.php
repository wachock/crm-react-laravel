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
            $table->string('invoicename')->nullable();

            $table->string('city')->nullable();
            $table->string('street_n_no')->nullable();
            $table->string('floor')->nullable();
            $table->string('apt_no')->nullable();
            $table->string('entrence_code')->nullable();
            $table->string('zipcode')->nullable();
            $table->string('dob')->nullable();
            $table->string('passcode')->nullable();
            $table->string('color')->nullable();
            $table->string('services')->nullable();

            $table->enum('role', ['worker', 'client'])->default('client');
            $table->string('phone')->nullable();
            $table->string('email')->unique();
            $table->enum('status', [0, 1])->default(0);
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
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
