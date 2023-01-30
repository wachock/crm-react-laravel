<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Job;
use App\Models\User;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function dashboard()
    {

        $total_employees    = User::where('role', 'employer')->count();
        $total_applicants   = User::where('role', 'applicant')->count();
        $total_jobs         = Job::count();
        $latest_employers   = User::where('role', 'employer')->orderBy('id', 'desc')->take(5)->get();

        return response()->json([
            'total_employees'       => $total_employees,
            'total_applicants'      => $total_applicants,
            'total_jobs'            => $total_jobs,
            'latest_employers'      => $latest_employers
        ], 200);
    }
}
