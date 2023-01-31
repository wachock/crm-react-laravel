<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $filter              = [];
        $filter['name']      = $request->name;
        $filter['email']     = $request->email;
        $filter['phone']     = $request->phone;
        $filter['status']    = $request->status;

        $clients   = User::query();
        if(isset($filter['name'])){
            $clients            = $clients->where(DB::raw("concat(firstname, ' ', lastname)"), 'LIKE', '%'.$filter['name'].'%');
        }
        if(isset($filter['email'])){
            $clients            = $clients->where('email', $filter['email']);
        }
        if(isset($filter['phone'])){
            $clients            = $clients->where('phone', $filter['phone']);
        }
        if(isset($filter['status'])){
            $clients            = $clients->where('status', $filter['status']);
        }
        $clients   = $clients->orderBy('id', 'desc')->paginate(20);

        return response()->json([
            'clients'       => $clients,            
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
            'firstname' => ['required', 'string', 'max:255'],
            'phone'     => ['required'],
            'status'    => ['required'],
            'passcode'  => ['required', 'string', 'min:6',],
            'email'     => ['required', 'string', 'email', 'max:255', 'unique:users'],
        ]); 

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->messages()]);
        }

        $input                  = $request->all();        
        $user                   = User::create($input);

        return response()->json([
            'message'       => 'Client created successfully',            
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
        $client               = User::find($id);

        return response()->json([
            'client'        => $client,            
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
        $client                = User::find($id);
        return response()->json([
            'client'        => $client,            
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
            'firstname' => ['required', 'string', 'max:255'],
            'passcode'  => ['required', 'string', 'min:6',],
            'phone'     => ['required'],
            'status'    => ['required'],
            'email'     => ['required', 'string', 'email', 'max:255', 'unique:users,email,'.$id],
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->messages()]);
        }

        $input                  = $request->all();        
        $user                   = User::where('id', $id)->update($input);

        return response()->json([
            'message'       => 'Client updated successfully',            
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
        User::find($id)->delete();
        return response()->json([
            'message'     => "Client has been deleted"         
        ], 200);
    }
}
