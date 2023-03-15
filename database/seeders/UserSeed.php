<?php

namespace Database\Seeders;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Faker\Generator;
use Illuminate\Support\Facades\Hash;

class UserSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = app(Generator::class);

        
        for ($i = 1; $i < 20 ; $i++) {
            User::create([
                'firstname'         => $faker->firstname(),
                'lastname'          => $faker->lastname(),
                'email'             => $faker->unique()->safeEmail(),
                'phone'             => $faker->numerify('9#########'),
                'address'           => $faker->address(),
                'renewal_visa'      =>  Carbon::now(),
                'gender'            => 'male',
                'payment_per_hour'  =>  rand(8,16),
                'worker_id'         => rand(10000,99999),
                'lng'               => 'en',
                'skill'             => ['1','2','3'],
                'status'            => 1,
                'passcode'          => 'password',
                'password'          => Hash::make('password'),
                'country'           =>'Israel',
            ]);
            
        }
        
            User::create([
                'firstname'         => 'לידור',
                'lastname'          => 'ממו',
                'email'             => 'brommservice@gmail.com',
                'phone'             => '0525264264',
                'address'           => $faker->address(),
                'renewal_visa'      =>  Carbon::now(),
                'gender'            => 'male',
                'payment_per_hour'  =>  '0',
                'worker_id'         => '67254',
                'lng'               => 'en',
                'skill'             => ['1','2','3'],
                'status'            => 1,
                'passcode'          => '123456',
                'password'          => Hash::make('123456'),
                'country'           =>'Israel',
            ]);
        
    }
}
