<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Job;
use App\Models\Offer;
use App\Models\Schedule;
use App\Models\Contract;
use App\Models\Files;
use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
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

        //$q  = $request->q;
        $id = $request->id;
        $result = Schedule::with('team')->where('client_id',$id);
         
        if(isset($request->q)):
          $q = $request->q;

          $result = $result->orWhereHas('team',function ($qr) use ($q){
            $qr->where(function($qr) use ($q) {
                $qr->where('name', 'like','%'.$q.'%');
            });
        });

         $result->orWhere('booking_status','like','%'.$q.'%');
         //$result->orWhere('end_time',       'like','%'.$q.'%');
         //$result->orWhere('start_date',     'like','%'.$q.'%');
         //$result->orWhere('start_time', 'like','%'.$q.'%');
        
        endif;
         
         $result = $result->where('client_id',$id)->paginate(20);
 
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

    public function getAccountDetails()
    {
        $account          = Auth::user();
        $account->avatar  = $account->avatar ? asset('storage/uploads/client/'.$account->avatar) : asset('images/man.png');
        return response()->json([
            'account'         => $account,
        ], 200);
    }

    public function saveAccountDetails(Request $request)
    {
        $client     = Auth::user();
        $validator = Validator::make($request->all(), [
            'firstname' => ['required', 'string', 'max:255'],
            'lastname' => ['required', 'string', 'max:255'],
            'invoicename' => ['required', 'string', 'max:255'],
            'phone'   => ['required', 'string'],
            'email'     => ['required', 'string', 'email', 'max:255', 'unique:clients,email,' . $client->id],
            'city' => ['required', 'string', 'max:255'],
            'street_n_no' => ['required', 'string', 'max:255'],
            'dob' => ['required'],
            'floor' => ['required'],
            'entrence_code' => ['required'],
            'lng' => ['required'],
            'apt_no' => ['required'],
            'zipcode' => ['required'],
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->messages()]);
        }

        $input                  = $request->all();
        if ($request->hasfile('avatar')) {
            $image              = $request->file('avatar');
            $name               = $image->getClientOriginalName();
            $image->storeAs('uploads/client/', $name, 'public');

            $input['avatar']      = $name;
        }
        $client                  = Client::where('id', $client->id)->update($input);

        return response()->json([
            'message'       => 'Account details updated successfully',
        ], 200);
    }

    public function changePassword(Request $request)
    {

        $id = Auth::user()->id;

        $validator = Validator::make($request->all(), [
            'current_password' => ['required', 'min:6'],
            'password'   => ['required', 'min:6', 'confirmed']
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->messages()]);
        }

        $client = Client::find($id);

        if (Hash::check($request->get('current_password'), $client->password)) {

            $client->password = Hash::make($request->password);
            $client->save();

            return response()->json([
                'message'       => 'Password changed successfully',
            ], 200);
        } else {

            return response()->json(['errors' => ['current_password' => 'Current password is incorrect.']]);
        }

        return response()->json([
            'message'       => 'Password changed successfully',
        ], 200);
    }

}
