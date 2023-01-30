<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JobAnnouncement extends Model
{
    use HasFactory;

    protected $fillable = [
        'announcement',
        'status',        
    ];
}
