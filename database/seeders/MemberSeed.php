<?php

namespace Database\Seeders;

use App\Models\TeamMember;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Faker\Generator;
use Illuminate\Support\Facades\Hash;

class MemberSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = app(Generator::class);
        for( $i = 0; $i <= 7; $i++){
        TeamMember::create([
            'name'              => $faker->name(),
            'address'           => $faker->address(),
            'email'             => $faker->unique()->safeEmail(),
            'phone'             => $faker->numerify('9#########'),
            'color'             => ('#eef').$i,
            'status'            => 1,
            'permission'        => 'member',
            'password'          => Hash::make('password')
        ]);
    }
  }
}
