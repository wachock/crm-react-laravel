<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TeamMember extends Model
{
    use HasFactory;
    protected $guard = 'team';

    protected $fillable = [
        'name',
        'email',
        'phone',
        'address',
        'password',
        'confirm_password',
        'color',
        'status',
        'permission'
    ];
}
