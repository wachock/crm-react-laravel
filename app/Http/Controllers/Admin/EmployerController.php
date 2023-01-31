<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class EmployerController extends Controller
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

        $employers   = Client::query();
        if(isset($filter['name'])){
            $employers            = $employers->where(DB::raw("concat(firstname, ' ', lastname)"), 'LIKE', '%'.$filter['name'].'%');
        }
        if(isset($filter['email'])){
            $employers            = $employers->where('email', $filter['email']);
        }
        if(isset($filter['phone'])){
            $employers            = $employers->where('phone', $filter['phone']);
        }
        if(isset($filter['status'])){
            $employers            = $employers->where('status', $filter['status']);
        }
        $employers   = $employers->orderBy('id', 'desc')->paginate(20);

        return response()->json([
            'employers'       => $employers,            
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
        //
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
        $employer                = User::find($id);

        return response()->json([
            'employer'        => $employer,            
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
            'address'   => ['required', 'string'],
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
            'message'       => 'Employer updated successfully',            
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
            'message'     => "Employer has been deleted"         
        ], 200);
    }
}
