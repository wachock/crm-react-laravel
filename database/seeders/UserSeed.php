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
                'address'           => $faker->address(),
                'role'              => 'employer',
                'phone'             => $faker->numerify('9#########'),
                'email'             => $i == 1 ? 'client@client.com' : $faker->unique()->safeEmail(),
                'status'            => 1,
                'email_verified_at' => Carbon::now(),
                'password'          => Hash::make('password')
            ]);
            
        }
        
        
    }
}
