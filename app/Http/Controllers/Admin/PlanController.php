<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Job;
use App\Models\Plan;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PlanController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {       

        $plans              = Plan::orderBy('id', 'desc')->paginate(20);
        
        return response()->json([
            'plans'         => $plans,        
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
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
        $validator = Validator::make($request->all(), [
            'name'               => ['required', 'string', 'max:255'],   
            'description'        => ['required'], 
            'price'              => ['required'],
            'cycle'              => ['required'],
            'currency'           => ['required'],  
            'profile_visit'      => ['required'],           
            'access_contacts'    => ['required'],  
            'allow_chat'         => ['required'],  
            'status'             => ['required'],           
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->messages()]);
        }

        $input                  = $request->all();       
        $plan                   = Plan::create($input);

        return response()->json([
            'message'       => 'Plan created successfully',            
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
        $plan                = Plan::find($id);

        return response()->json([
            'plan'       => $plan,        
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
            'name'               => ['required', 'string', 'max:255'],   
            'description'        => ['required'], 
            'price'              => ['required'],
            'cycle'              => ['required'],
            'currency'           => ['required'],  
            'profile_visit'      => ['required'],           
            'access_contacts'    => ['required'],  
            'allow_chat'         => ['required'],  
            'status'             => ['required'],     2      
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->messages()]);
        }

        $input                  = $request->all();            
        $plan                   = Plan::where('id', $id)->update($input);

        return response()->json([
            'message'       => 'Plan updated successfully',            
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
        Plan::find($id)->delete();
        return response()->json([
            'message'     => "Plan has been deleted"         
        ], 200);
    }
}
