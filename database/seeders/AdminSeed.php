<?php

namespace Database\Seeders;

use App\Models\Admin;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Faker\Generator;
use Illuminate\Support\Facades\Hash;

class AdminSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = app(Generator::class);

        Admin::create([
            'firstname'         => $faker->firstname(),
            'lastname'          => $faker->lastname(),
            'address'           => $faker->address(),
            'email'             => 'admin@admin.com',
            'phone'             => $faker->numerify('9#########'),
            'avatar'            => 'admin.png',
            'email_verified_at' => Carbon::now(),
            'password'          => Hash::make('password')
        ]);
    }
}
