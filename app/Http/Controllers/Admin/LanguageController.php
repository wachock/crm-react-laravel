<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Language;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class LanguageController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $filter                     = [];
        $filter['language']         = $request->language;       
        $filter['status']           = $request->status;

        $languages              = Language::query();

        if(isset($filter['language'])){
            $languages          = $languages->where('language', 'LIKE', '%'.$filter['language'].'%');
        }
       
        if(isset($filter['status'])){
            $languages          = $languages->where('status', $filter['status']);
        }

        $languages              = $languages->orderBy('id', 'desc')->paginate(20);

        return response()->json([
            'languages'         => $languages,        
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
            'language' => ['required', 'string', 'max:255'],           
            'status'      => ['required'],           
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->messages()]);
        }

        $input                  = $request->all();        
        $language               = Language::create($input);

        return response()->json([
            'message'       => 'Language created successfully',            
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
        $language                = Language::find($id);

        return response()->json([
            'language'       => $language,        
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
            'language' => ['required', 'string', 'max:255'],           
            'status'      => ['required'],           
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->messages()]);
        }

        $input                  = $request->all();        
        $language            = Language::where('id', $id)->update($input);

        return response()->json([
            'message'       => 'Language updated successfully',            
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
        Language::find($id)->delete();
        return response()->json([
            'message'     => "Language has been deleted"         
        ], 200);
    }
}
