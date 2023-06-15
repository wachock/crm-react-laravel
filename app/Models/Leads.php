<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Leads extends Model
{
    use HasFactory;
    protected $table="leads";
    
    protected $fillable = [
        'firstname',
        'lastname',
        'invoicename',
        'city',
        'street_n_no',
        'floor',
        'apt_no',
        'entrence_code',
        'zipcode',
        'dob',
        'passcode',
        'geo_address',
        'lng',
        'latitude',
        'longitude',
        'color',
        'address',
        'phone',
        'email',
        'status',
        'password',
        'extra',
        'avatar',

    ];
}
