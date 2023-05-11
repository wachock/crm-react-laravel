<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Job;
use App\Models\Admin;
use App\Models\User;
use App\Models\Contract;
use App\Models\serviceSchedules;
use App\Models\WorkerAvialibilty;
use App\Models\JobHours;
use App\Models\JobService;
use App\Models\Order;
use App\Models\Invoices;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Mail;
use Helper;

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
        $jobs = Job::with('worker', 'client','offer','jobservice')->where('worker_id',$request->id);
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
         $job = Job::with('client','worker','jobservice')->find($id);
         //$this->invoice($id);
         $job->status ='completed';
         $job->save();
          $admin = Admin::find(1)->first();
             \App::setLocale('en');
             $data = array(
                'email'      =>$admin->email,
                'admin'      =>$admin->toArray(),
                'job'        => $job->toArray(),

             );

            //  Mail::send('/WorkerPanelMail/JobStatusNotification',$data,function($messages) use ($data){
            //     $messages->to($data['email']);
            //     $sub = __('mail.job_status.subject');
            //     $messages->subject($sub);
            //   });

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
        $job = Job::find($request->job_id);
        if($job->status != 'progress'){
            $job->status = 'progress';
            $job->save();
        }
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

    public function jobOrderGenerate(){
      
        $jobs = Job::where(['status'=>'progress','isOrdered'=>0])->get();

        if(!empty($jobs)){
            foreach($jobs as $job){
                $this->order($job->id);
            }
        }

    }

   

    public function order($id){

        $job = Job::where('id',$id)->with('jobservice','client')->get()->first();
        $services = json_decode($job->jobservice);
        $items = []; 
        if(isset($services)){
            foreach($services as $service){
              $itm = [
                "description" => $service->name,
                "unitprice"   => 0.01,
                "quantity"    => 1,
              ];
              array_push($items,$itm);
            }
            JobService::where('id',$service->id)->update(['order_status'=>1]);
        }
        $invoice  = 1;
        if( str_contains($job->schedule,'w') ){ 
            $invoice = 0;
        }
       
        $url = "https://api.icount.co.il/api/v3.php/doc/create";
        $params = Array(

        "cid"  => env('ICOUNT_COMPANYID'),
        "user" => env('ICOUNT_USERNAME'),
        "pass" => env('ICOUNT_PASS'),
        "doctype" => "order",
        "client_name" => "test user", 
        "client_address" => $job->client->geo_address,
        "email" => $job->client->email, 
        "lang" => $job->client->lng,
        "currency_code" => "ILS",
        
        "items" => $items,
    

        "send_email" => 1, 
        "email_to_client" => 1, 
        "email_to" => $job->client->email, 
        );

            $ch = curl_init($url);
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($params, null, '&'));
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            $response = curl_exec($ch);
            $info = curl_getinfo($ch);

            if(!$info["http_code"] || $info["http_code"]!=200) die("HTTP Error");
            $json = json_decode($response, true);
            
            if(!$json["status"]) die($json["reason"]);
           
            Order::create([
                'order_id'=>$json['docnum'],
                'doc_url' =>$json['doc_url'],
                'job_id'=>$id,
                'response' => $response,
                'invoice_status'=>( $invoice == 1) ? 1 : 0,
            ]);   
            Job::where('id',$id)->update(['isOrdered'=>1]);        
    }

    public function jobInvoiceGenerate(){
         $orders = Order::where('invoice_status',1)->get();
         if(!empty($orders)){
            foreach($orders as $od){
                echo "<pre>";
                print_r($od->job_id);
            }
         }   
           
    }

    public function invoice($id){
        
        $job = Job::where('id',$id)->with('jobservice','client')->get()->first();
        $services = json_decode($job->jobservice);

        $i_job = ['value'=>$id, 'label'=>$job->shifts];
        $ise = [];
        $stotal = 0;

        if(isset($services)){
            foreach($services as $service){

            $stotal += (int)$service->total;
            $i_se = [

                "description" => $service->name,
                "unitprice"   => 0.01,
                "quantity"    => 1,
            ];
            array_push($ise,$i_se);
            }
            JobService::where('id',$service->id)->update(['order_status'=>2]);
        }
        
        $order = Order::where('job_id',$id)->get();
        $o_res = json_decode($order->response);

        $url = "https://api.icount.co.il/api/v3.php/doc/create";
        $params = Array(

            "cid"            => env('ICOUNT_COMPANYID'),
            "user"           => env('ICOUNT_USERNAME'),
            "pass"           => env('ICOUNT_PASS'),

            "doctype"        =>  "invoice",
            "client_id"      => $ores->client_id,
            "client_name"    => "test user", 
            "client_address" => $job->client->geo_address,
            "email"          => $job->client->email, 
            "lang"           => $job->client->lng,
            "currency_code"  => "ILS",
            "doc_lang"       =>$job->client->lng,
            "items"          => $ise,
            "duedate"        => \Carbon\Carbon::now()->endOfMonth()->toDateString(),
    
            "send_email"      => 1, 
            "email_to_client" => 1, 
            "email_to"        => $job->client->email, 
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
        echo "Created invoice/receipt #".$json["docnum"];

       /* $vatper   = 17;
        $vatprice = ($vatper/100) * $stotal;

        $inv = [
            'customer'  =>$job->client->id,
            'job'       =>json_encode($i_job),
            'services'  =>json_encode($ise),
            'due_date'  => \Carbon\Carbon::now()->endOfMonth()->toDateString(),
            'subtotal'  =>$stotal,
            'taxper'    =>$vatper,
            'total_tax' =>$vatprice,
            'amount'    =>(int)$stotal + (int)$vatprice,
            'status'    =>'pending'
        ];

    

        $in = Invoices::create($inv);
        job::where('id',$id)->update([
            'invoice_no'    =>$in->id,
        ]);
        Helper::sendInvoiceToClient($in->id);*/



    }

}