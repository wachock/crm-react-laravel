<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNotificationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('notifications', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->enum('type',[
                'sent-meeting',
                'accept-meeting',
                'reject-meeting',
                'accept-offer',
                'reject-offer',
                'contract-accept',
                'contract-reject',
                'client-cancel-job',
                'worker-reschedule'
            ]);
            $table->string('status');
            $table->string('meet_id')->nullable();
            $table->string('offer_id')->nullable();
            $table->string('contract_id')->nullable();
            $table->string('job_id')->nullable();
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
        Schema::dropIfExists('notifications');
    }
}
