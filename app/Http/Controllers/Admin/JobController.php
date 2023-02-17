<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Job;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class JobController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {   
        
        $q =  $request->q;
        $jobs = Job::where('status',$q)->with('worker', 'client','offer');
        $jobs = $jobs->orderBy('id', 'desc')->paginate(20);
        return response()->json([
            'jobs'       => $jobs,        
        ], 200);


    }
    public function getAllJob(){
        $jobs = Job::where('status',1)->get();;
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
        $validator = Validator::make($request->all(),[
            'client_id' =>['required'],
            'worker_id' =>['required'],
            'start_date'=>['required']
        ]);
        if($validator->fails()){
            return response()->json(['error'=>$validator->messages()]);
        }
        Job::create($request->input());
        return response()->json([
            'message' => 'Job has been created successfully'
        ],200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $job                = Job::with('client', 'worker')->find($id);
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
        $job = Job::with('client','worker','service','offer')->find($id);
        return response()->json([
            'job'=>$job
        ]);
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
        $validator = Validator::make($request->all(),[
            'client_id' =>['required'],
            'worker_id' =>['required'],
            'start_date' =>['required'] 
        ]);
        if($validator->fails()){
            return response()->json(['error'=>$validator->messages()]);
        }
        Job::where('id',$id)->update($request->input());
        return response()->json([
            'message'=>'Job has been updated successfully'
        ]);
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

    public function getJobByClient(Request $request){
      
       $jobs = Job::with('service','worker')->where('client_id',$request->cid)->get();
       return response()->json([
        'jobs' => $jobs
    ]);
    }
    public function getJobWorker(Request $request){
        $filter              = [];
        $filter['status']    = $request->status;
        $jobs = Job::with('client', 'worker','service')->where('worker_id',$request->wid);
        
          if(isset($filter['status']) && $filter['status']){
            $jobs            = $jobs->where('status', 'completed');
          }else{
            $jobs            = $jobs->where('status', '!=','completed');
          }

        $jobs = $jobs->orderBy('id', 'desc')->paginate(20);

        return response()->json([
            'jobs' => $jobs
        ]);

    }
    public function updateJob(Request $request, $id)
    {
        //
        $job = Job::find($id);
        if($request->date != ''){
            $job->start_date=$request->date;
        }
        if($request->worker != ''){
            $job->worker_id=$request->worker;
        }
        if($request->shifts != ''){
            $job->shifts=$request->shifts;
        }
        if($request->comment != ''){
            $job->comment=$request->comment;
        }
        $job->save();
        return response()->json([
            'message'=>'Job has been updated successfully'
        ],200);
    }
    public function createJob(Request $request,$id){

         $job = Job::find($id);
         foreach($request->workers as $worker){
            $new = new Job;
            $new->client_id     = $job->client_id;
            $new->worker_id     = $worker['worker_id'];
            $new->offer_id      = $job->offer_id;
            $new->contract_id   = $job->contract_id;
            $new->start_date    = $worker['date'];
            $new->start_time    = $worker['start'];
            $new->end_time      = $worker['end'];
            $new->status   = 'scheduled';
            $new->save();
         }

        return response()->json([
            'message'=>'Job has been created successfully'
        ],200);

    }
}
