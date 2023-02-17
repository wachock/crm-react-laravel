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
            'name'         => 'One Time', 
            'cycle'        => 1,
            'period'       =>'na',  
            'status'       => 1             
        ]);
        serviceSchedules::create([
            'name'         => 'On demand',  
            'cycle'        => 0,
            'period'       =>'na',
            'status'       => 1                
        ]);
        serviceSchedules::create([
            'name'         => 'Once Time week', 
            'cycle'        => 1,
            'period'       =>'w',
            'status'       => 1                 
        ]);
        serviceSchedules::create([
            'name'         => 'Twice in week',
            'cycle'        => 2,
            'period'       =>'w',
            'status'       => 1                  
        ]);
        serviceSchedules::create([
            'name'         => 'Three Time week',
            'cycle'        => 3,
            'period'       =>'w',      
            'status'       => 1            
        ]);
        serviceSchedules::create([
            'name'         => 'Four Time week', 
            'cycle'        => 4,
            'period'       =>'w',     
            'status'       => 1            
        ]);
        serviceSchedules::create([
            'name'         => 'Five Time week',  
            'cycle'        => 5,
            'period'       =>'w',    
            'status'       => 1            
        ]);
        serviceSchedules::create([
            'name'         => 'Once in every two weeks',
            'cycle'        => 1,
            'period'       =>'2w',      
            'status'       => 1            
        ]);
        serviceSchedules::create([
            'name'         => 'Once in every three weeks', 
            'cycle'        => 1,
            'period'       =>'3w',     
            'status'       => 1            
        ]);
        serviceSchedules::create([
            'name'         => 'Once in every Month',  
            'cycle'        => 1,
            'period'       =>'m',    
            'status'       => 1            
        ]);
        serviceSchedules::create([
            'name'         => 'Once in 2 Months',
            'cycle'        => 1,
            'period'       =>'2m',      
            'status'       => 1            
        ]);
        serviceSchedules::create([
            'name'         => 'Once in every 3 Months', 
            'cycle'        => 1,
            'period'       =>'3m',     
            'status'       => 1            
        ]);

    }
}
