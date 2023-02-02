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
                'phone'             => $faker->numerify('9#########'),
                'address'           => $faker->address(),
                'renewal_visa'      =>  Carbon::now(),
                'gender'            => 'male',
                'payment_per_hour'  =>  rand(8,16),
                'worker_id'         => rand(10000,99999),
                'skill'             => ['1','2','3'],
                'status'            => 1,
                'passcode'          => 'password',
                'password'          => Hash::make('password')
            ]);
            
        }
        
        
    }
}
