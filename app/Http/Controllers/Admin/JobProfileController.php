<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\JobProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class JobProfileController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $filter                     = [];
        $filter['type']             = $request->type;       
        $filter['status']           = $request->status;

        $profiles              = JobProfile::query();

        if(isset($filter['type'])){
            $profiles          = $profiles->where('type', 'LIKE', '%'.$filter['type'].'%');
        }
       
        if(isset($filter['status'])){
            $profiles          = $profiles->where('status', $filter['status']);
        }

        $profiles              = $profiles->orderBy('id', 'desc')->paginate(20);

        return response()->json([
            'profiles'         => $profiles,        
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
            'type'       => ['required', 'string', 'max:255'],           
            'status'      => ['required'],           
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->messages()]);
        }

        $input                  = $request->all();        
        $profile                = JobProfile::create($input);

        return response()->json([
            'message'       => 'Job profile created successfully',            
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
        $profile                = JobProfile::find($id);

        return response()->json([
            'profile'       => $profile,        
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
            'type' => ['required', 'string', 'max:255'],           
            'status'      => ['required'],           
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->messages()]);
        }

        $input                  = $request->all();        
        $profile                = JobProfile::where('id', $id)->update($input);

        return response()->json([
            'message'       => 'Job profile updated successfully',            
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
        JobProfile::find($id)->delete();
        return response()->json([
            'message'     => "Job Profile has been deleted"         
        ], 200);
    }
}
