<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Job;
use App\Models\User;
use App\Models\Contract;
use App\Models\Services;
use App\Models\serviceSchedules;
use App\Models\JobHours;
use App\Models\JobService;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Mail;
use Maatwebsite\Excel\Facades\Excel;
use Carbon;
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
        $jobs = Job::with('worker', 'client','offer','jobservice');
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
        $job                = Job::with('client','worker','service','offer','jobservice')->find($id);

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
        $job = Job::with('client','worker','service','offer','jobservice')->find($id);
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

        $this->sendWorkerEmail($id);
        
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
        $jobs = Job::with('client', 'worker','service','jobservice')->where('worker_id',$request->wid);
        
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
        if($request->worker != ''){
          $this->sendWorkerEmail($id);
        }
        return response()->json([
            'message'=>'Job has been updated successfully'
        ],200);
    }
    public function createJob(Request $request,$id){
         $job = Contract::with('offer')->find($id);
         $repeat_value='';
         $s_name='';
         $s_heb_name='';
         $s_hour='';
         $s_total='';
         foreach($request->services as $service){
                  $service_schedules = serviceSchedules::where('id','=',$service['frequency'])->first();
                  $ser = Services::where('id','=',$service['service'])->first();

                      $repeat_value=$service_schedules->period;
                      $s_name=$ser->name;
                      $s_heb_name=$ser->heb_name;
                      $s_hour=$service['jobHours'];
                      $s_total=$service['totalamount'];

         }
         $client_mail=array();
         $client_email='';
         foreach($request->workers as $worker){
            $new = new Job;
            $new->client_id     = $job->client_id;
            $new->worker_id     = $worker['worker_id'];
            $new->offer_id      = $job->offer_id;
            $new->contract_id   = $id;
            $new->start_date    = $worker['date'];
            $new->shifts        = $worker['shifts'];
            $new->schedule      = $repeat_value;
            $new->status        = 'scheduled';
            $new->save();

            $service           = new JobService;
            $service->job_id   = $new->id;
            $service->name     = $s_name;
            $service->heb_name = $s_heb_name;
            $service->job_hour = $s_hour;
            $service->total    = $s_total;
            $service->save();

             $job = Job::with('client','worker','jobservice')->where('id',$new->id)->first();
             $data = array(
                'email'=> $job['worker']['email'],
                'job'  => $job->toArray(),
             );
            \App::setLocale($job->worker->lng);
            Mail::send('/Mails/NewJobMail',$data,function($messages) use ($data){
                $messages->to($data['email']);
                $sub = __('mail.worker_new_job.subject')."  ".__('mail.worker_new_job.company');
                $messages->subject($sub);
            });

            $client_mail[] = $data;
            $client_email  =  $job['client']['email'];
            $client_name  =  $job['client']['firstname'].' '.$job['client']['lastname'];
            $client_lng    = $job['client']['lng'];


        }
        \App::setLocale($client_lng);
        $client_data = array(
            'email'=>$client_email,
            'name' => $client_name,
            'jobs' => $client_mail,
        );
         Mail::send('/Mails/NewJobClient',$client_data,function($messages) use ($client_data){
                $messages->to($client_data['email']);
                $sub = __('mail.client_new_job.subject')."  ".__('mail.client_new_job.company');
                $messages->subject($sub);
            });


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

    public function exportReport(Request $request){
      
    if($request->type =='single'){
      $jobs = JobHours::where('job_id',$request->id)->with('worker')->get();
      $fileName = 'job_report_'.$request->id.'.csv';
    }
    else{
      $jobs = JobHours::whereDate('created_at','>=',$request->from)
              ->whereDate('created_at','<=',$request->to)->get();
      $fileName = 'AllJob_report.csv';
    }

      if(empty($jobs)){
        return response()->json([
            'status_code'=>404,
            'msg' => 'No work log is found!'
        ]);
      }
      
      $report = [];
      $total=0;
      foreach($jobs as $job){

        $row['worker_name']      = $job->worker->firstname." ".$job->worker->lastname;
        $row['worker_id']        = $job->worker->worker_id;
        $row['start_time']       = $job->start_time;
        $row['end_time']         = $job->end_time;
        $row['time_diffrence']   = $job->time_diff;
        $row['job_id']           = $job->job_id;
        $row['time_total']       = (int)$job->time_diff;
        
        array_push($report,$row);
      }
      
      
      return response()->json([
        'status_code'=> 200,
        'filename'=>$fileName,
        'report'=>$report
      ]);

    }
    public function sendWorkerEmail($job_id){
            $job = Job::with('client','worker','jobservice')->where('id',$job_id)->first();
             $data = array(
                'email'=> $job['worker']['email'],
                'job'  => $job->toArray(),
             );
            \App::setLocale($job->worker->lng);
            Mail::send('/Mails/NewJobMail',$data,function($messages) use ($data){
                $messages->to($data['email']);
                $sub = __('mail.worker_new_job.subject')."  ".__('mail.worker_new_job.company');
                $messages->subject($sub);
            });
            return true;

    }
    

}
