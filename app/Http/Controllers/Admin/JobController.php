<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Job;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class JobController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {   
        $filter              = [];
        $filter['title']     = $request->title;
        $filter['applicant'] = $request->applicant;
        $filter['status']    = $request->status;

        
        $jobs                = Job::with('employer', 'applicant');

        if(isset($filter['title'])){
            $jobs            = $jobs->where('title', 'LIKE', '%'.$filter['title'].'%');
        }

        if(isset($filter['applicant'])){
            $applicant       = $filter['applicant'];
            $jobs            =  $jobs->whereHas('applicant', function($q) use ($applicant) {
                $q->where(function($q) use ($applicant) {
                    $q->where(DB::raw("concat(firstname, ' ', lastname)"), 'LIKE', '%' . $applicant . '%');
                });
            });

        }

        if(isset($filter['status'])){
            $jobs            = $jobs->where('status', $filter['status']);
        }

        $jobs                = $jobs->orderBy('id', 'desc')->paginate(20);

        return response()->json([
            'jobs'       => $jobs,        
        ], 200);
    }

    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $job                = Job::with('employer', 'applicant')->find($id);
        $slots              = collect([]);

        foreach($job->slots as $slot){

            $day            = Str::of(Str::after($slot, 'Day'))->trim();
            $timings        = Str::of(Str::before($slot, 'Day'))->trim();

            $slots->push([
                'day'       => $day, 
                'slot'      => $timings
            ]);
        }
        $job->slots         = $slots;

        return response()->json([
            'job'        => $job,            
        ], 200);

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Job::find($id)->delete();
        return response()->json([
            'message'     => "Job has been deleted"         
        ], 200);
    }
}
