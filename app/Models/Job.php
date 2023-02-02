<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
    use HasFactory;

    protected $fillable = [
        'client_id',        
        'job_id',
        'worker_id',
        'start_date',
        'end_date',
        'schedule',
        'instruction',
        'address',
        'start_time',
        'end_time',
        'rate',
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


}
