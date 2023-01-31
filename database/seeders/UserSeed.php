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
        
        for ($i = 1; $i < 10 ; $i++) {
            User::create([
                'firstname'         => $faker->firstname(),
                'lastname'          => $faker->lastname(),
                'street_n_no'       => $faker->address(),
                'invoicename'       => $faker->firstname().' '.$faker->lastname(),
                'city'              => $faker->city(),
                'floor'             => rand(2,4),
                'apt_no'            => rand(1,3),
                'entrence_code'     => rand(1,4),
                'zipcode'           => $faker->postcode(),
                'dob'               => $faker->dateTimeBetween('1990-01-01', '2012-12-31')->format('m/d/Y'),
                'passcode'          => rand(1,6),
                'color'             => ('#ffee'.rand(2,4)),
                'phone'             => $faker->numerify('9#########'),
                'email'             => $i == 1 ? 'client@admin.com' : $faker->unique()->safeEmail(),
                'status'            => 1,
                'email_verified_at' => Carbon::now(),
                'password'          => Hash::make('password')
            ]);
            
        }
        
        
    }
}
