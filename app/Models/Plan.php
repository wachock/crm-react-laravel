<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Plan extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'price',
        'cycle',
        'currency',
        'profile_visit',
        'access_contacts',
        'allow_chat',
        'status'       
    ];

    public function subscription()
    {
        return $this->hasOne(Subscription::class);
    }
}
