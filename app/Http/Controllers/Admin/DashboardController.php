<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Job;
use App\Models\User;
use App\Models\Client;
use App\Models\Offer;
use App\Models\Schedule;
use App\Models\Contract;
use App\Models\notifications;
use App\Models\Admin;
use App\Models\ManageTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

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
        $latest_jobs     = Job::with('client','service','worker','jobservice')->where('status','completed')->orderBy('id', 'desc')->take(10)->get();

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


    public function Notice(Request $request){
      
      $count = notifications::count();
      $seenCount = notifications::where('seen',0)->count();
      if($count > 0) :
      
      if($request->head)
      $noticeAll = notifications::with('client')->orderBy('id', 'desc')->take(5)->get();
      if($request->all)
      $noticeAll = notifications::with('client')->orderBy('id', 'desc')->paginate(15);
    
      if(isset($noticeAll)){
        foreach($noticeAll as $k => $notice){
          
          if($notice->type == 'sent-meeting'){

            $sch = Schedule::with('client')->where('id',$notice->meet_id)->get()->first();
            if(isset($sch))
            $noticeAll[$k]->data = "<a href='/admin/view-schedule/".$sch->client->id."?sid=".$sch->id."'> Meeting </a> scheduled with <a href='/admin/view-client/".$sch->client->id."'>".$sch->client->firstname." ".$sch->client->lastname.
                            "</a> on " .Carbon::parse($sch->start_date)->format('d-m-Y') ." at ".($sch->start_time);

          }
          if($notice->type == 'accept-meeting'){

            $sch = Schedule::with('client')->where('id',$notice->meet_id)->get()->first();
            if(isset($sch))
            $noticeAll[$k]->data = "<a href='/admin/view-schedule/".$notice->client->id."?sid=".$sch->id."'> Meeting </a> with <a href='/admin/view-client/".$sch->client->id."'>".$sch->client->firstname." ".$sch->client->lastname.
                            "</a> has been confirmed now on " .Carbon::parse($sch->start_date)->format('d-m-Y')  ." at ".($sch->start_time);

          }
          if($notice->type == 'reject-meeting'){

            $sch = Schedule::with('client')->where('id',$notice->meet_id)->get()->first();
            if(isset($sch))
            $noticeAll[$k]->data = "<a href='/admin/view-schedule/".$notice->meet_id."?sid=".$sch->id."'> Meeting </a> with <a href='/admin/view-client/".$sch->client->id."'>".$sch->client->firstname." ".$sch->client->lastname.
                            "</a> which on " .Carbon::parse($sch->start_date)->format('d-m-Y')  ." at ".($sch->start_time)." has cancelled now.";

          }
         
          if($notice->type == 'accept-offer'){

            $ofr = Offer::with('client')->where('id',$notice->offer_id)->get()->first();
            if(isset($ofr))
            $noticeAll[$k]->data = "<a href='/admin/view-client/".$ofr->client->id."'>".$ofr->client->firstname." ".$ofr->client->lastname.
                            "</a> has accepted the <a href='/admin/view-offer/".$notice->offer_id."'> price offer </a>";

          }
         
          if($notice->type == 'reject-offer'){

            $ofr = Offer::with('client')->where('id',$notice->offer_id)->get()->first();
            if(isset($ofr))
            $noticeAll[$k]->data = "<a href='/admin/view-client/".$ofr->client->id."'>".$ofr->client->firstname." ".$ofr->client->lastname.
                            "</a> has rejected <a href='/admin/view-offer/".$notice->offer_id."'>the price offer </a>";
          }
          
          if($notice->type == 'contract-accept'){
            
            $contract = Contract::with('offer','client')->where('id',$notice->contract_id)->get()->first();
            if(isset($contract)):
              $noticeAll[$k]->data = "<a href='/admin/view-client/".$contract->client->id."'>".$contract->client->firstname." ".$contract->client->lastname.
              "</a> has approved the <a href='/admin/view-contract/".$contract->id."'> contract </a>";
              if($contract->offer){
                $noticeAll[$k]->data .= "for <a href='/admin/view-offer/".$contract->offer->id."'> offer</a>";
              }
            endif;

          }
           
          if($notice->type == 'contract-reject'){

            $contract = Contract::with('offer','client')->where('id',$notice->contract_id)->get()->first();
            if(isset($contract)):
              $noticeAll[$k]->data = "<a href='/admin/view-client/".$contract->client->id."'>".$contract->client->firstname." ".$contract->client->lastname.
              "</a> has rejected the <a href='/admin/view-contract/".$contract->id."'> contract </a>";
              if($contract->offer){
                $noticeAll[$k]->data .= "for <a href='/admin/view-offer/".$contract->offer->id."'> offer</a>";
              }
          endif;

          }
          if($notice->type == 'client-cancel-job'){

            $job = Job::with('offer','client')->where('id',$notice->job_id)->get()->first();
            if(isset($job)):
            $noticeAll[$k]->data = "<a href='/admin/view-client/".$job->client->id."'>".$job->client->firstname." ".$job->client->lastname.
            "</a> has cancelled the  <a href='/admin/view-job/".$job->id."'> job </a>";
            if($job->offer){
            $noticeAll[$k]->data .= "for <a href='/admin/view-offer/".$job->offer->id."'> offer </a> ";
            }
          endif;

          }
        }
      }
      return response()->json([
        'notice'=>$noticeAll,
        'count'=>$seenCount
      ]);

      else :
        
        return response()->json([
          'notice'=> []
        ]);

      endif;
      
    }
    public function viewPass(Request $request){
      $user = Admin::where('id',$request->id)->get()->first();
      $response = Hash::check($request->pass,$user->password);
      return response()->json([
        'response'=>$response
      ]);

    }
    public function seen(){
      notifications::where('seen',0)->update(['seen'=>1]);
    }
    public function clearNotices(){
      notifications::truncate(); 
    }
    public function income(Request $request){
      
      $tasks = Job::with('client','worker','offer','hours')->where('status','completed');
      if(empty($request->duration) || $request->duration == 'all')
      $tasks = $tasks->get();

      if($request->duration == 'day')
      $tasks = $tasks->whereDate('created_at',Carbon::today())->get();

      if($request->duration == 'month')
      $tasks = $tasks->whereMonth('created_at',Carbon::now()->month)->get();

      if($request->duration == 'week')
      $tasks = $tasks->whereBetween('created_at',[Carbon::now()->startOfWeek(),Carbon::now()->endOfWeek()])->get();

      $inc = 0;
      if(isset($tasks)){
        foreach($tasks as $t1 => $task){

          if(isset($task->hours)){
            $tsec = 0;
            foreach($task->hours as $t => $hour){
            $tsec += $hour->time_diff;
            }
            $tasks[$t1]->total_sec = $tsec; 
          }

          if(isset($task->offer)){
           
              $inc += $task->offer->subtotal;
          }


        }
      }
      return response()->json([
        'tasks' =>$tasks,
        'total_tasks' => $tasks->count(),
        'income'=>$inc,
      ]);
    }

   
}
