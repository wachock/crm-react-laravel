<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInvoicesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('invoices', function (Blueprint $table) {
            $table->id();
            $table->string('amount');
            $table->string('subtotal');
            $table->string('taxper')->nullable();
            $table->string('total_tax')->nullable();
            $table->string('due_date')->nullable();
            $table->string('customer');
            $table->longText('job');
            $table->string('paid_amount')->nullable();
            $table->string('txn_id')->nullable();
            $table->string('mode')->nullable();
            $table->longText('services');
            $table->longText('session_id')->nullable();
            $table->longText('callback')->nullable();
            $table->string('status');
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
        Schema::dropIfExists('invoices');
    }
}
