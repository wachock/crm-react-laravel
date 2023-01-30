<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Nationality;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class NationalityController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $filter                     = [];
        $filter['nationality']      = $request->nationality;       
        $filter['status']           = $request->status;

        $nationalities              = Nationality::query();

        if(isset($filter['nationality'])){
            $nationalities          = $nationalities->where('nationality', 'LIKE', '%'.$filter['nationality'].'%');
        }
       
        if(isset($filter['status'])){
            $nationalities          = $nationalities->where('status', $filter['status']);
        }

        $nationalities              = $nationalities->orderBy('id', 'desc')->paginate(20);

        return response()->json([
            'nationalities'         => $nationalities,        
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
            'nationality' => ['required', 'string', 'max:255'],           
            'status'      => ['required'],           
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->messages()]);
        }

        $input                  = $request->all();        
        $nationality            = Nationality::create($input);

        return response()->json([
            'message'       => 'Nationality created successfully',            
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
        $nationality                = Nationality::find($id);

        return response()->json([
            'nationality'       => $nationality,        
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
            'nationality' => ['required', 'string', 'max:255'],           
            'status'      => ['required'],           
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->messages()]);
        }

        $input                  = $request->all();        
        $nationality            = Nationality::where('id', $id)->update($input);

        return response()->json([
            'message'       => 'Nationality updated successfully',            
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
        Nationality::find($id)->delete();
        return response()->json([
            'message'     => "Nationality has been deleted"         
        ], 200);
    }
}
