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
            'name'              => $faker->fullname(),
            'address'           => $faker->address(),
            'email'             => 'admin@admin.com',
            'phone'             => $faker->numerify('9#########'),
            'color'             => ('#').random_str(6),
            'status'            => 1,
            'permission'        => 'member',
            'password'          => Hash::make('password')
        ]);
    }
  }
}
