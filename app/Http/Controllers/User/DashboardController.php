<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Job;
use App\Models\User;
use App\Models\ManageTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class DashboardController extends Controller
{
    public function dashboard(Request $request)
    {
        $id              = $request->id;
        $total_jobs      = Job::where('worker_id',$id)->count();
        $latest_jobs     = Job::where('worker_id',$id)->with('client','offer','worker','jobservice')->orderBy('id', 'desc')->take(10)->get();

        return response()->json([
            'total_jobs'         => $total_jobs,
            'latest_jobs'        => $latest_jobs
        ], 200);
    }
     public function getTime(){
       $time  = ManageTime::where('id',1)->get();
       return response()->json([
        'time' => $time
       ]);
    }
}
