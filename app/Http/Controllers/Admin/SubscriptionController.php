<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Plan;
use App\Models\Subscription;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class SubscriptionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $filter                     = [];
        $filter['employer']         = $request->employer;
        $filter['plan']             = $request->plan;  
        $filter['date']             = $request->date;     
        $filter['status']           = $request->status;

        $subscriptions              = Subscription::with('employer', 'plan');

        if(isset($filter['employer'])){
            $employer               = $filter['employer'];
            $subscriptions          =  $subscriptions->whereHas('employer', function($q) use ($employer) {
                $q->where(function($q) use ($employer) {
                    $q->where(DB::raw("concat(firstname, ' ', lastname)"), 'LIKE', '%' . $employer . '%');
                });
            });
        }       

        if(isset($filter['plan'])){
            $plan               = $filter['plan'];
            $subscriptions          =  $subscriptions->whereHas('plan', function($q) use ($plan) {
                $q->where(function($q) use ($plan) {
                    $q->where('id', $plan);
                });
            });
        }   

        if(isset($filter['date'])){
            $subscriptions          = $subscriptions->whereDate('created_at', $filter['date']);
        }
       
        if(isset($filter['status'])){
            $subscriptions          = $subscriptions->where('status', $filter['status']);
        }

        $subscriptions              = $subscriptions->orderBy('id', 'desc')->paginate(20);        

        return response()->json([
            'subscriptions'         => $subscriptions   
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $employers = User::where('role', 'employer')->get(['id', 'firstname', 'lastname']);
        $plans     = Plan::get(['id', 'name']);
        return response()->json([
            'employers'     => $employers,
            'plans'         => $plans        
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [           
            'user_id'      => ['required'], 
            'plan_id'      => ['required'],
            'valid_from'   => ['required'],
            'valid_upto'   => ['required'],           
            'status'       => ['required'],           
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->messages()]);
        }

        $input                  = $request->all();            
        $subscription           = Subscription::create($input);

        return response()->json([
            'message'       => 'Subscription created successfully',            
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $subscription            = Subscription::find($id);

        return response()->json([
            'subscription'       => $subscription,        
        ], 200);
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
        $validator = Validator::make($request->all(), [
            'user_id'      => ['required'], 
            'plan_id'      => ['required'],
            'valid_from'   => ['required'],
            'valid_upto'   => ['required'],           
            'status'       => ['required'],     
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->messages()]);
        }

        $input                  = $request->all();      
        $subscription           = Subscription::where('id', $id)->update($input);

        return response()->json([
            'message'       => 'Subscription updated successfully',            
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
        Subscription::find($id)->delete();
        return response()->json([
            'message'     => "Subscription has been deleted"         
        ], 200);
    }
}
