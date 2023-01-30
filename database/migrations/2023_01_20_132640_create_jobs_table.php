<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateJobsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('jobs', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->unsignedBigInteger('job_profile_id');
            $table->unsignedBigInteger('job_announcement_id');
            $table->text('title')->nullable();
            $table->longText('description')->nullable();
            $table->longText('address')->nullable();
            $table->string('phone')->nullable();
            $table->longText('slots')->nullable();
            $table->date('start_date')->nullable();
            $table->unsignedBigInteger('applicant_id')->nullable();
            $table->unsignedBigInteger('rate')->nullable();
            $table->enum('status', ['posted', 'booked', 'completed'])->default('posted');
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
        Schema::dropIfExists('jobs');
    }
}
