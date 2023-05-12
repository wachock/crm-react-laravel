<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invoices extends Model
{
    use HasFactory;
    protected $fillable = [
        'invoice_id',
        'job_id',
        'amount',
        'doc_url',
        'due_date',
        'customer',
        'txn_id',
        'session_id',
        'callback',
        'status'
    ];

    public function client(){
        return $this->belongsTo(Client::class,'customer');
    }
}
