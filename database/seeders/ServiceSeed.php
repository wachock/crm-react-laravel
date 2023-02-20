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
            'template'     => 'office_cleaning',
            'status'       => 1                
        ]);
        Services::create([
            'name'         => 'Cleaning After Renovation', 
            'template'     => 'after_renovation',
            'status'       => 1                 
        ]);
        Services::create([
            'name'         => 'Thorough Cleaning',     
            'template'     => 'thorough_cleaning', 
            'status'       => 1           
        ]);
        Services::create([
            'name'         => '5 Star',
            'template'     => 'regular',
            'status'       => 1                  
        ]);
        Services::create([
            'name'         => '4 Star',
            'template'     => 'regular',
            'status'       => 1                  
        ]);
        Services::create([
            'name'         => '3 Star',
            'template'     => 'regular',
            'status'       => 1                  
        ]);
        Services::create([
            'name'         => '2 Star',
            'template'     => 'reguar',
            'status'       => 1                  
        ]);
        Services::create([
            'name'         => 'window cleaning',
            'template'     => '',
            'status'       => 1                  
        ]);
        Services::create([
            'name'         => 'P',
            'template'     => '',
            'status'       => 1                  
        ]);
        Services::create([
            'name'         => 'Others',
            'template'     => '',
            'status'       => 1                  
        ]);

    }
}
