<?php

namespace Database\Seeders;

use App\Models\Services;
use Illuminate\Database\Seeder;

class ServiceSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        
        Services::create([
            'name'         => 'Windows Cleaning',   
            'status'       => 1             
        ]);
        Services::create([
            'name'         => 'Door Mattings',  
            'status'       => 1                
        ]);
        Services::create([
            'name'         => 'Glass furnishing', 
            'status'       => 1                 
        ]);
        Services::create([
            'name'         => 'Garden grass cutting',
            'status'       => 1                  
        ]);
        Services::create([
            'name'         => 'planting',      
            'status'       => 0            
        ]);

    }
}
