<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Job;
use App\Models\User;
use App\Models\Client;
use App\Models\Offer;
use App\Models\Schedule;
use App\Models\Contract;
use App\Models\ManageTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon

class CronController extends Controller
{
    public function WeeklyJob(){
        $startDate = Carbon::now()->startOfWeek()->subDays(1);
        $endDate = Carbon::now()->startOfWeek()->addDays(5);
        $jobs = Job::query()->with('offer','contract')->whereBetween('start_date',[$startDate, $endDate]);
        $jobs = $jobs->whereHas('contract', function ($query) {
                    $query->where('job_status', '=',1);
                })->get();
    
        foreach($jobs as $job){
             if($job->schedule == '1 week'){
                 $date = Carbon::parse($job->start_date);
                 $newDate = $date->addDays(7);
             }
             if($job->schedule == '2 week'){
                 $date = Carbon::parse($job->start_date);
                 $newDate = $date->addDays(14);
             }
             if($job->schedule == '3 week'){
                 $date = Carbon::parse($job->start_date);
                 $newDate = $date->addDays(21);
             }
             if($job->schedule == '1 month'){
                 $date = Carbon::parse($job->start_date);
                 $newDate = $date->addMonths(1);
             }
             if($job->schedule == '2 month'){
                 $date = Carbon::parse($job->start_date);
                 $newDate = $date->addMonths(2);
             }
             if($job->schedule == '3 month'){
                 $date = Carbon::parse($job->start_date);
                 $newDate = $date->addMonths(3);
             }
            $new = new Job();
            $new->client_id     = $job->client_id;
            $new->worker_id     = $job->worker_id;
            $new->offer_id      = $job->offer_id;
            $new->contract_id   = $job->contract_id;
            $new->start_date    = $newDate;
            $new->start_time    = $job->start_time;
            $new->end_time      = $job->end_time;
            $new->schedule      = $job->schedule;
            $new->status        = 'unscheduled';

            $new->save();
                
        }
    }
}
