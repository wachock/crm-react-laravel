<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Job;
use App\Models\User;
use App\Models\Contract;
use App\Models\serviceSchedules;
use App\Models\JobHours;
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
        $jobs = Job::with('worker', 'client','offer');
        $jobs = $jobs->orderBy('id', 'desc')->paginate(20);
        return response()->json([
            'jobs'       => $jobs,        
        ], 200);


    }
    public function getAllJob(){
        $jobs = Job::get();;
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
        $job                = Job::with('client','worker','service','offer')->find($id);

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
        $validator = Validator::make($request->all(),[
            'workers' =>['required'], 
        ]);
        if($validator->fails()){
            return response()->json(['error'=>$validator->messages()]);
        }
        $worker=$request->workers[0];
        $job = Job::find($id);
        $job->worker_id     = $worker['worker_id'];
        $job->start_date    = $worker['date'];
        $job->start_time    = $worker['start'];
        $job->end_time      = $worker['end'];
        $job->status   = 'scheduled';
        $job->save();
        
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
       
       $jobs = Job::with('offer','worker')->where('client_id',$request->cid)->get();
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

         $job = Contract::with('offer')->find($id);
         $repeat_value='';
         foreach(json_decode($job->offer->services) as $service){
                
                  $service_schedules = serviceSchedules::where('name','=',$service->freq_name)->first();
                      $repeat_value=$service_schedules->period;
         }
         foreach($request->workers as $worker){
            $new = new Job;
            $new->client_id     = $job->client_id;
            $new->worker_id     = $worker['worker_id'];
            $new->offer_id      = $job->offer_id;
            $new->contract_id   = $id;
            $new->start_date    = $worker['date'];
            $new->start_time    = $worker['start'];
            $new->end_time      = $worker['end'];
            $new->schedule      = $repeat_value;
            $new->status   = 'scheduled';
            $new->save();
         }

        return response()->json([
            'message'=>'Job has been created successfully'
        ],200);

    }
    public function getJobTime(Request $request){
         $time = JobHours::where('job_id',$request->job_id)->get();
         $total=0;
         foreach($time as $t){
                if($t->time_diff){
                  $total = $total+(int)$t->time_diff;
                }
          }
          return response()->json([
            'time'     => $time,
            'total'    => $total         
            ], 200);
    }
    public function addJobTime(Request $request){
        $validator = Validator::make($request->all(),[
            'start_time' =>['required'],
            'end_time'  =>['required']
        ]);
        if($validator->fails()){
            return response()->json(['error'=>$validator->messages()]);
        }
        $time = new JobHours();
        $time->job_id=$request->job_id;
        $time->worker_id=$request->worker_id;
        $time->start_time=$request->start_time;
        $time->end_time=$request->end_time;
        $time->time_diff=$request->timeDiff;
        $time->save();
         return response()->json([
            'time'     => $time,        
            ], 200);
    }
    public function updateJobTime(Request $request){
         $validator = Validator::make($request->all(),[
            'start_time' =>['required'],
            'end_time'  =>['required']
        ]);
        if($validator->fails()){
            return response()->json(['error'=>$validator->messages()]);
        }
        $time = JobHours::find($request->id);
        $time->start_time=$request->start_time;
        $time->end_time=$request->end_time;
        $time->time_diff=$request->timeDiff;
        $time->save();
        return response()->json([
            'time'     => $time,        
            ], 200);
    }
    public function deleteJobTime($id){
         JobHours::find($id)->delete();
          return response()->json([
            'message'     => 'Job Time Deleted Successfully',   
            ], 200);
    }

}
