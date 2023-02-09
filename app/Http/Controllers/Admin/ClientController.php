<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
       
        $q = $request->q;
        $result = Client::query();
        $result->where('firstname',    'like','%'.$q.'%');
        $result->orWhere('lastname',   'like','%'.$q.'%');
        $result->orWhere('phone',      'like','%'.$q.'%');
        $result->orWhere('city',       'like','%'.$q.'%');
        $result->orWhere('street_n_no','like','%'.$q.'%');
        $result->orWhere('zipcode',    'like','%'.$q.'%');
        $result->orWhere('status',     'like','%'.$q.'%');
        $result->orWhere('email',      'like','%'.$q.'%');

        $result = $result->orderBy('id', 'desc')->paginate(20);

        return response()->json([
            'clients'       => $result,            
        ], 200);
    }

    public function AllClients(){
        
        $clients = Client::where('status',1)->get();
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
            'email'     => ['required', 'string', 'email', 'max:255', 'unique:clients'],
        ]); 

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->messages()]);
        }

        $input                  = $request->all();    
        $input['password']      = Hash::make($request->password);    
        $client                 = Client::create($input);

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
        $client               = Client::find($id);
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
        $client                = Client::find($id);
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
            'passcode'  => ['required', 'string', 'min:6'],
            'phone'     => ['required'],
            'status'    => ['required'],
            'email'     => ['required', 'string', 'email', 'max:255', 'unique:clients,email,'.$id],
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->messages()]);
        }

        $input                  = $request->all();  
        $input['password']      = Hash::make($request->password);         
        $client                 = Client::where('id', $id)->update($input);

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
        Client::find($id)->delete();
        return response()->json([
            'message'     => "Client has been deleted"         
        ], 200);
    }
}
