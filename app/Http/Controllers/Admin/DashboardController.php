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
use App\Models\ManageTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
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
        $latest_jobs     = Job::with('client','service','worker')->where('status','completed')->orderBy('id', 'desc')->take(10)->get();

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
      
      if($request->head)
      $noticeAll = notifications::with('client')->orderBy('id', 'desc')->take(5)->get();
      if($request->all)
      $noticeAll = notifications::with('client')->orderBy('id', 'desc')->paginate(15);
    
      if(isset($noticeAll)){
        foreach($noticeAll as $k => $notice){
          
          if($notice->type == 'sent-meeting'){
            $sch = Schedule::where('id',$notice->meet_id)->get()->first();
            $noticeAll[$k]->data = "<a href='/admin/view-schedule/".$notice->client->id."?sid=".$sch->id."'> Meeting </a> scheduled with <a href='/admin/view-client/".$notice->client->id."'>".$notice->client->firstname." ".$notice->client->lastname.
                            "</a> on " .Carbon::parse($sch->start_date)->format('d-m-Y') ." at ".($sch->start_time);
          }
          if($notice->type == 'accept-meeting'){
            $sch = Schedule::where('id',$notice->meet_id)->get()->first();
            $noticeAll[$k]->data = "<a href='/admin/view-schedule/".$notice->client->id."?sid=".$sch->id."'> Meeting </a> with <a href='/admin/view-client/".$notice->client->id."'>".$notice->client->firstname." ".$notice->client->lastname.
                            "</a> has been confirmed now on " .Carbon::parse($sch->start_date)->format('d-m-Y')  ." at ".($sch->start_time);
          }
          if($notice->type == 'reject-meeting'){
            $sch = Schedule::where('id',$notice->meet_id)->get()->first();
            $noticeAll[$k]->data = "<a href='/admin/view-schedule/".$notice->meet_id."?sid=".$sch->id."'> Meeting </a> with <a href='/admin/view-client/".$notice->client->id."'>".$notice->client->firstname." ".$notice->client->lastname.
                            "</a> which on " .Carbon::parse($sch->start_date)->format('d-m-Y')  ." at ".($sch->start_time)." has cancelled now.";
          }

          if($notice->type == 'accept-offer'){

            $ofr = Offer::where('id',$notice->offer_id)->get()->first();
            $noticeAll[$k]->data = "<a href='/admin/view-client/".$notice->client->id."'>".$notice->client->firstname." ".$notice->client->lastname.
                            "</a> has accepted the <a href='/admin/view-offer/".$notice->offer_id."'> price offer </a>";

          }
          if($notice->type == 'reject-offer'){

            $ofr = Offer::where('id',$notice->offer_id)->get()->first();
            $noticeAll[$k]->data = "<a href='/admin/view-client/".$notice->client->id."'>".$notice->client->firstname." ".$notice->client->lastname.
                            "</a> has rejected <a href='/admin/view-offer/".$notice->offer_id."'>the price offer </a>";
          }
          if($notice->type == 'contract-accept'){

            $contract = Contract::with('offer')->where('id',$notice->contract_id)->get()->first();
            $noticeAll[$k]->data = "<a href='/admin/view-client/".$notice->client->id."'>".$notice->client->firstname." ".$notice->client->lastname.
            "</a> has approved the <a href='/admin/view-contract/".$contract->id."'> contract </a> for <a href='/admin/view-offer/".$contract->offer->id."'> offer</a>";

          }
          if($notice->type == 'contract-reject'){

            $contract = Contract::with('offer')->where('id',$notice->contract_id)->get()->first();
            $noticeAll[$k]->data = "<a href='/admin/view-client/".$notice->client->id."'>".$notice->client->firstname." ".$notice->client->lastname.
            "</a> has rejected the <a href='/admin/view-contract/".$contract->id."'> contract </a> for <a href='/admin/view-offer/".$contract->offer->id."'> offer</a>";

          }
          if($notice->type == 'client-cancel-job'){

            $job = Job::with('offer')->where('id',$notice->job_id)->get()->first();
            $noticeAll[$k]->data = "<a href='/admin/view-client/".$notice->client->id."'>".$notice->client->firstname." ".$notice->client->lastname.
            "</a> has cancelled the  <a href='/admin/view-job/".$notice->job_id."'> job </a>  for <a href='/admin/view-offer/".$job->offer->id."'> offer </a> ";

          }
        }
      }
      return response()->json([
        'notice'=>$noticeAll
      ]);
    }
}
