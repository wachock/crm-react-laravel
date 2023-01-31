<?php

namespace Database\Seeders;

use App\Models\serviceSchedules;
use Illuminate\Database\Seeder;

class ServiceScheduleSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        
        serviceSchedules::create([
            'name'         => 'Once in a week',   
            'status'       => 1             
        ]);
        serviceSchedules::create([
            'name'         => 'Twice in a week',  
            'status'       => 1                
        ]);
        serviceSchedules::create([
            'name'         => 'Thrice in a week', 
            'status'       => 1                 
        ]);
        serviceSchedules::create([
            'name'         => 'Monthly',
            'status'       => 1                  
        ]);
        serviceSchedules::create([
            'name'         => 'Quarterly',      
            'status'       => 0            
        ]);
        serviceSchedules::create([
            'name'         => 'Yearly',      
            'status'       => 0            
        ]);

    }
}
