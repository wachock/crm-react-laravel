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
            'name_heb'     => 'פעם אחת',
            'cycle'        => 1,
            'period'       =>'na',  
            'status'       => 1             
        ]);
        serviceSchedules::create([
            'name'         => 'On demand',  
            'name_heb'     => 'לפי דרישה',
            'cycle'        => 0,
            'period'       =>'na',
            'status'       => 1                
        ]);
        serviceSchedules::create([
            'name'         => 'Once Time week', 
            'name_heb'     => 'פעם אחת שבוע זמן',
            'cycle'        => 1,
            'period'       =>'w',
            'status'       => 1                 
        ]);
        serviceSchedules::create([
            'name'         => 'Twice in week',
            'name_heb'     => 'פעמיים בשבוע',
            'cycle'        => 2,
            'period'       =>'w',
            'status'       => 1                  
        ]);
        serviceSchedules::create([
            'name'         => 'Three Time week',
            'name_heb'     => 'שבוע שלוש פעמים',
            'cycle'        => 3,
            'period'       =>'w',      
            'status'       => 1            
        ]);
        serviceSchedules::create([
            'name'         => 'Four Time week', 
            'name_heb'     => 'שבוע ארבע פעמים',
            'cycle'        => 4,
            'period'       =>'w',     
            'status'       => 1            
        ]);
        serviceSchedules::create([
            'name'         => 'Five Time week',  
            'name_heb'     => 'שבוע חמש פעמים',
            'cycle'        => 5,
            'period'       =>'w',    
            'status'       => 1            
        ]);
        serviceSchedules::create([
            'name'         => 'Once in every two weeks',
            'name_heb'     => 'פעם בשבועיים',
            'cycle'        => 1,
            'period'       =>'2w',      
            'status'       => 1            
        ]);
        serviceSchedules::create([
            'name'         => 'Once in every three weeks', 
            'name_heb'     => 'פעם בשלושה שבועות',
            'cycle'        => 1,
            'period'       =>'3w',     
            'status'       => 1            
        ]);
        serviceSchedules::create([
            'name'         => 'Once in every Month',  
            'name_heb'     => 'פעם בכל חודש',
            'cycle'        => 1,
            'period'       =>'m',    
            'status'       => 1            
        ]);
        serviceSchedules::create([
            'name'         => 'Once in 2 Months',
            'name_heb'     => 'פעם בחודשיים',
            'cycle'        => 1,
            'period'       =>'2m',      
            'status'       => 1            
        ]);
        serviceSchedules::create([
            'name'         => 'Once in every 3 Months', 
            'name_heb'     => 'פעם ב-3 חודשים',
            'cycle'        => 1,
            'period'       =>'3m',     
            'status'       => 1            
        ]);

    }
}
