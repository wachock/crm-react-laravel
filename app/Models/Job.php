<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',        
        'job_profile_id',
        'job_announcement_id',
        'title',
        'description',
        'address',
        'phone',
        'slots',
        'start_date',
        'applicant_id',
        'rate',
        'status'
    ];

    protected $casts = [
        'slots' => 'array',
    ];
   

    public function employer()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function applicant()
    {
        return $this->belongsTo(User::class, 'applicant_id');
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

}
