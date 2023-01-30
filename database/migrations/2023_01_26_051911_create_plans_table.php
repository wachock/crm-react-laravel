<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePlansTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('plans', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->longText('description')->nullable();
            $table->double('price')->nullable();
            $table->enum('cycle', ['Monthly', 'Quarterly', 'Half-yearly', 'Yearly'])->default('Monthly');
            $table->enum('currency', ['usd', 'eur', 'gbp', 'inr'])->default('eur');            
            $table->unsignedBigInteger('profile_visit')->nullable();
            $table->enum('access_contacts', [0, 1])->default(0);
            $table->enum('allow_chat', [0, 1])->default(0);
            $table->enum('status', [0, 1])->default(0);
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
        Schema::dropIfExists('plans');
    }
}
