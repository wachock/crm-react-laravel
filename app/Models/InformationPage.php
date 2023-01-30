<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InformationPage extends Model
{
    use HasFactory;

    protected $fillable = [
        'page',
        'content',
        'status',        
    ];
}
