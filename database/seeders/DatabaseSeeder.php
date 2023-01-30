<?php

namespace Database\Seeders;

use App\Models\JobAnnouncement;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(GeneralSettingSeed::class);
        $this->call(NationalitySeed::class);
        $this->call(LanguageSeed::class);
        $this->call(SkillSeed::class);
        $this->call(TaskSeed::class);
        $this->call(PlanSeed::class);
        $this->call(InformationPageSeed::class);
        $this->call(UserSeed::class);
        $this->call(SubscriptionSeed::class); 
        $this->call(AdminSeed::class);
        $this->call(JobAnnouncementSeed::class);
        $this->call(JobProfileSeed::class);
        $this->call(JobSeed::class);
        $this->call(ReviewSeed::class);
    }
}
