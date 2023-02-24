<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
    use HasFactory;

    protected $fillable = [
        'client_id',        
        'offer_id',
        'contract_id',
        'worker_id',
        'start_date',
        'end_date',
        'schedule_id',
        'schedule',
        'comment',
        'instruction',
        'address',
        'start_time',
        'end_time',
        'rate',
        'invoice_no',
        'invoice_url',
        'status'
    ];

    public function worker()
    {
        return $this->belongsTo(User::class, 'worker_id');
    }

    public function client()
    {
        return $this->belongsTo(Client::class, 'client_id');
    }
    public function service()
    {
        return $this->belongsTo(Services::class, 'job_id');
    }
    public function offer(){
        return $this->belongsTo(Offer::class, 'offer_id');
    }
    public function contract(){
        return $this->belongsTo(Contract::class,'contract_id');
    }


}
