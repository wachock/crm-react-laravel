<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Job;
use App\Models\User;
use App\Models\Contract;
use App\Models\serviceSchedules;
use App\Models\WorkerAvialibilty;
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
        $jobs = Job::with('worker', 'client','offer')->where('worker_id',$request->id);
        $jobs = $jobs->orderBy('id', 'desc')->paginate(20);
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
         $job = Job::find($id);
         $this->invoice($id);
         die();
         $job->status ='completed';
         $job->save();

        return response()->json([
            'message'        => 'job completed',            
        ], 200);
       
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
       
    }
    public function getWorkerAvailability($id){
         $worker_availabilities = WorkerAvialibilty::where('user_id',$id)
                             ->orderBy('id', 'asc')
                             ->get();
            $new_array=array();
            foreach($worker_availabilities as $w_a){
                 $new_array[$w_a->date]=$w_a->working;
            }

           return response()->json([
            'availability'     => $new_array,         
           ], 200);
    }
    public function updateAvailability(Request $request,$id){
        WorkerAvialibilty::where('user_id',$id)->delete();
        foreach($request->data as $key=>$availabilty){
           $avl = new WorkerAvialibilty;
           $avl->user_id=$id;
           $avl->date=trim($key);
           $avl->working=$availabilty;
           $avl->status='1';
           $avl->save();
        }
        return response()->json([
            'message'     => 'Updated Successfully',         
        ], 200);
    }
    public function JobStartTime(Request $request){
        $time = new JobHours();
        $time->job_id=$request->job_id;
        $time->worker_id=$request->worker_id;
        $time->start_time=$request->start_time;
        $time->save();
        return response()->json([
            'message'     => 'Updated Successfully',         
        ], 200);
    }
    public function JobEndTime(Request $request){
        $time = JobHours::find($request->id);
        $time->end_time=$request->end_time;
        $time->time_diff=$request->time_diff;
        $time->save();
        return response()->json([
            'message'     => 'Updated Successfully',         
        ], 200);
    }
    public function getJobTime(Request $request){
         $time = JobHours::where('job_id',$request->job_id)->where('worker_id',$request->worker_id);
         $total=0;
         if($request->filter_end_time){
            $time = $time->where('end_time',NULL)->first();
         }else{
            $time = $time->get();
            foreach($time as $t){
                if($t->time_diff){
                  $total = $total+(int)$t->time_diff;
                }
            }
         }
          return response()->json([
            'time'     => $time,
            'total'    => $total         
            ], 200);
    }

    public function invoice($id){

        $job = Job::where('id',$id)->with('offer','worker')->get()->first();
        $services = json_decode($job->offer->services);
        $items = []; 
        if(isset($services)){
            foreach($services as $service){
              $itm = [
                "description" => $service->name,
                "unitprice"   => $service->totalamount,
                "quantity"    => 1,
              ];
              array_push($items,$itm);
            }
        }
        
        $url = "https://api.icount.co.il/api/v3.php/doc/create";
        $params = Array(

        "cid"  => env('ICOUNT_COMPANYID'),
        "user" => env('ICOUNT_USERNAME'),
        "pass" => env('ICOUNT_PASS'),
        "doctype" => "order",
        "client_name" => "Broom Service", 
        "email" => "office@broomservice.co.il", 
        "lang" => $job->worker->lng,
        "currency_code" => "ILS",
        
        "items" => $items,
        
        "cc" => Array(
        "sum" => $job->offer->total,
        "card_type" => "VISA",
        ),

        "send_email" => 1, 
        "email_to_client" => 1, 
        "email_to" => $job->worker->email, 
        );

            $ch = curl_init($url);
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($params, null, '&'));
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            $response = curl_exec($ch);
            $info = curl_getinfo($ch);

            if(!$info["http_code"] || $info["http_code"]!=200) throw new Exception("HTTP Error");
            $json = json_decode($response, true);
            if(!$json["status"]) throw new Exception($json["reason"]);
            job::where('id',$id)->update([
                'invoice_no'    =>$json['docnum'],
                'invoice_url'   =>$json['doc_url']
            ]
            );
    }
}
