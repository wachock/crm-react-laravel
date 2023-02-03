<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Job;
use App\Models\User;
use App\Models\Client;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function dashboard()
    {

        $total_workers   = User::all()->count();
        $total_clients   = Client::all()->count();
        $total_jobs      = Job::count();
        $latest_jobs     = Job::with('client','service','worker')->where('status','completed')->orderBy('id', 'desc')->take(10)->get();

        return response()->json([
            'total_workers'       => $total_workers,
            'total_clients'      => $total_clients,
            'total_jobs'         => $total_jobs,
            'latest_jobs'      => $latest_jobs
        ], 200);
    }
}
