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
            'name'         => 'Office Cleaning',  
            'status'       => 1                
        ]);
        Services::create([
            'name'         => 'Cleaning After Renovation', 
            'status'       => 1                 
        ]);
        Services::create([
            'name'         => 'Thorough Cleaning',      
            'status'       => 1           
        ]);
        Services::create([
            'name'         => '5 Star',
            'status'       => 1                  
        ]);
        Services::create([
            'name'         => '4 Star',
            'status'       => 1                  
        ]);
        Services::create([
            'name'         => '3 Star',
            'status'       => 1                  
        ]);
        Services::create([
            'name'         => '2 Star',
            'status'       => 1                  
        ]);
        Services::create([
            'name'         => 'window cleaning',
            'status'       => 1                  
        ]);
        Services::create([
            'name'         => 'P',
            'status'       => 1                  
        ]);
        Services::create([
            'name'         => 'Others',
            'status'       => 1                  
        ]);

    }
}
