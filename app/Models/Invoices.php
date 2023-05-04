<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invoices extends Model
{
    use HasFactory;
    protected $fillable = [
        'amount',
        'subtotal',
        'taxper',
        'total_tax',
        'due_date',
        'customer',
        'job',
        'services',
        'status'
    ];

    public function client(){
        return $this->belongsTo(Client::class,'customer');
    }
}
