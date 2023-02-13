<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Job;
use App\Models\Offer;
use App\Models\Schedule;
use App\Models\Contract;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function dashboard(Request $request)
    {
        $id              = $request->id;
        $total_jobs      = Job::where('client_id',$id)->count();
        $total_offers    = Offer::where('client_id',$id)->count();
        $total_schedules  = Schedule::where('client_id',$id)->count();
        $total_contracts  = Contract::where('client_id',$id)->count();
        $latest_jobs     = Job::where('client_id',$id)->with('client','service','worker')->where('status','completed')->orderBy('id', 'desc')->take(10)->get();

        return response()->json([
            'total_jobs'         => $total_jobs,
            'total_offers'       => $total_offers,
            'total_schedules'    => $total_schedules,
            'total_contracts'    => $total_contracts,
            'latest_jobs'        => $latest_jobs
        ], 200);
    }

    //Schedules

    public function meetings(Request $request)
    {

        $q  = $request->q;
        $id = $request->id;
        $result = Schedule::where('client_id',$id)->with('team');

         /*
        if(!is_null($q))
        $result->orWhere('booking_status','like','%'.$q.'%');
       
        $result->orWhere('end_time',       'like','%'.$q.'%');
        $result->orWhere('start_date',     'like','%'.$q.'%');
        $result->orWhere('start_time', 'like','%'.$q.'%');
        
        
         $result = $result->orWhereHas('team',function ($qr) use ($q){
            $qr->where(function($qr) use ($q) {
                $qr->where(DB::raw('name'), 'like','%'.$q.'%');
            });
        });
        */
         $result = $result->paginate(20);
 
         return response()->json([
             'schedules' => $result
         ]);
 

        
    }

    public function showMeetings($id)
    {
        $schedule = Schedule::where('id',$id)->with('client','team')->get()->first();
        return response()->json([
            'schedule' => $schedule
        ]);
    }

    //Offers
    public function offers(Request $request)
    {
        $q = $request->q;
        $id = $request->id;
        $result = Offer::where('client_id',$id);  
         /*
        if(!is_null($q)){

        $result->orWhere('status','like','%'.$q.'%');
        $result->orWhere('total', 'like','%'.$q.'%');

        }
        */
         $result = $result->orderBy('id', 'desc')->paginate(20);
 
        return response()->json([
            'offers'=>$result
        ],200);
    }

    public function viewOffer(Request $request){
        
        $offer = Offer::where('id',$request->id)->with('client')->get()->first();
        return response()->json([
            'offer' => $offer
        ]);
    }

    //Contracts

    public function contracts(Request $request){
         
        $q = $request->q;
        $id= $request->id;
        $result = Contract::where('client_id',$id)->with('client','offer');  
        /*
        $result->orWhere('status','like','%'.$q.'%');
        
        $result = $result->orWhereHas('client',function ($qr) use ($q){
             $qr->where(function($qr) use ($q) {
                 $qr->where(DB::raw('firstname'), 'like','%'.$q.'%');
                 $qr->orWhere(DB::raw('lastname'), 'like','%'.$q.'%');
                 $qr->orWhere(DB::raw('email'), 'like','%'.$q.'%');
                 $qr->orWhere(DB::raw('city'), 'like','%'.$q.'%');
                 $qr->orWhere(DB::raw('street_n_no'), 'like','%'.$q.'%');
                 $qr->orWhere(DB::raw('zipcode'), 'like','%'.$q.'%');
                 $qr->orWhere(DB::raw('phone'), 'like','%'.$q.'%');
             });
         });
        */
         $result = $result->orderBy('id', 'desc')->paginate(20);
        
        return response()->json([
            'contracts'=>$result
        ],200);

    }


    public function getContract(Request $request){
       
        $contract = Contract::where('id',$request->id)->get();
        return response()->json([
            'contract'=>$contract
        ],200);
    }

}
