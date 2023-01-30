<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\InformationPage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class InformationPageController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $filter                     = [];
        $filter['page']            = $request->page;       
        $filter['status']           = $request->status;

        $pages              = InformationPage::query();

        if(isset($filter['page'])){
            $pages          = $pages->where('page', 'LIKE', '%'.$filter['page'].'%');
        }
       
        if(isset($filter['status'])){
            $pages          = $pages->where('status', $filter['status']);
        }

        $pages              = $pages->orderBy('id', 'desc')->paginate(20);

        return response()->json([
            'pages'         => $pages,        
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
            'page'         => ['required', 'string', 'max:255'],   
            'content'      => ['required'],           
            'status'       => ['required'],           
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->messages()]);
        }

        $input                  = $request->all();        
        $page                   = InformationPage::create($input);

        return response()->json([
            'message'       => 'Page created successfully',            
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
        $page                = InformationPage::find($id);

        return response()->json([
            'page'       => $page,        
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
            'page'         => ['required', 'string', 'max:255'],  
            'content'      => ['required'],            
            'status'       => ['required'],           
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->messages()]);
        }

        $input                  = $request->all();        
        $page                   = InformationPage::where('id', $id)->update($input);

        return response()->json([
            'message'       => 'Page updated successfully',            
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
        InformationPage::find($id)->delete();
        return response()->json([
            'message'     => "Page has been deleted"         
        ], 200);
    }
}
