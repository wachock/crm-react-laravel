<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Job;
use App\Models\Offer;
use App\Models\Schedule;
use App\Models\Contract;
use App\Models\Files;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Image;
use File;

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
       
        $contract = Contract::where('id',$request->id)->with('client')->get();
        return response()->json([
            'contract'=>$contract
        ],200);
    }

    public function addfile(Request $request){
 
        /*
        $video = $request->file('file');
        $vname = $video->getClientOriginalName();
        $path=storage_path().'/app/public/uploads/ClientFiles';
        $video->move($path,$vname);
        */

        $validator = Validator::make($request->all(), [
            'file'   => 'required|mimes:jpeg,jpg,png',
            'role'   => 'required',
            'user_id'=>'required'
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->messages()]);
        }

        $image_nm = '';
        if($request->hasfile('file')){

            $image = $request->file('file');
            $name = $image->getClientOriginalName();
            $img = Image::make($image)->resize(350, 227);
            $destinationPath=storage_path().'/app/public/uploads/ClientFiles/';
            $fname = 'file_'.$request->user_id.'_'.date('s').'_'.$name;
            $path=storage_path().'/app/public/uploads/ClientFiles/'. $fname;
            File::exists($destinationPath) or File::makeDirectory($destinationPath,0777,true,true);
            $img->save($path, 90);
            $image_nm  = $fname; 
        }
        
        Files::create([
            'user_id'   => $request->user_id,
            'meeting'   => $request->meeting,
            'note'      => $request->note,
            'role'      =>'client',
            'type'      =>$request->type,
            'file'      => $image_nm

        ]);

        return response()->json([
            'message'=>'File uploaded',
        ],200);
    }
    public function getfiles(Request $request){
         $files = Files::where([
            'user_id'=>$request->id,
            'role' =>'client',
            'meeting'=>$request->meet_id
         ])->get();
         if(isset($files)){
            foreach($files as $k => $file){
                
                $files[$k]->path =  asset('storage/uploads/ClientFiles')."/".$file->file;
                
            }
         }
         return response()->json([
            'files'=>$files
        ],200);
    }
    public function deletefile(Request $request){
        Files::where('id',$request->id)->delete();
        return response()->json([
            'message'=>'File deleted',
        ],200);
    }

}
