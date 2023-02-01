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
        'rate',
        'status'
    ];

    public function worker()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function client()
    {
        return $this->belongsTo(Client::class, 'applicant_id');
    }


}
