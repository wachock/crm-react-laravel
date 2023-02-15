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
            'name'         => 'Regular Room Service',   
            'status'       => 1             
        ]);
        Services::create([
            'name'         => 'Office Cleaning',  
            'status'       => 1                
        ]);
        Services::create([
            'name'         => 'Cleaning After Renovation', 
            'status'       => 1                 
        ]);
        Services::create([
            'name'         => 'Garden grass cutting',
            'status'       => 1                  
        ]);
        Services::create([
            'name'         => 'Thorough Cleaning',      
            'status'       => 1           
        ]);

    }
}
