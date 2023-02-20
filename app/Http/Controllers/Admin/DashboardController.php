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
}
