<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'author',
        'job_id',
        'review',
        'rating',
        'date',
        'status'        
    ];

    public function job()
    {
        return $this->belongsTo(Job::class, 'job_id');
    }
}
