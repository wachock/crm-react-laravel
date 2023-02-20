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
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function dashboard()
    {

        $total_workers   = User::all()->count();
        $total_clients   = Client::all()->count();
        $total_jobs      = Job::count();
        $total_offers    = Offer::count();
        $total_schedules  = Schedule::count();
        $total_contracts  = Contract::count();
        $latest_jobs     = Job::with('client','service','worker')->where('status','completed')->orderBy('id', 'desc')->take(10)->get();

        return response()->json([
            'total_workers'      => $total_workers,
            'total_clients'      => $total_clients,
            'total_jobs'         => $total_jobs,
            'total_offers'       => $total_offers,
            'total_schedules'    => $total_schedules,
            'total_contracts'    => $total_contracts,
            'latest_jobs'        => $latest_jobs
        ], 200);
    }

    public function updateTime(Request $request){

      $validator = Validator::make($request->all(),[
        'start_time'=>'required',
        'end_time'  =>'required',
      ]);
      if($validator->fails()){
        return response()->json(['errors'=>$validator->messages()]);
      }
      ManageTime::where('id',1)->update([
        'start_time' => $request->start_time,
        'end_time'   => $request->end_time,
        'days'       => $request->days
      ]);
      return response()->json(['message'=>'Time update successfully']);
    }

    public function getTime(){
       $time  = ManageTime::where('id',1)->get();
       return response()->json([
        'time' => $time
       ]);
    }
    
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
