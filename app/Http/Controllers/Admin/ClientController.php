<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Client;
use App\Models\Files;
use App\Models\Note;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Image;
use File;
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
         $files = Files::where('user_id',$request->id)->get();
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

    public function addNote(Request $request){
       
        $validator = Validator::make($request->all(),[
            'note'     =>'required',
            'team_id'  =>'required',
            'user_id'  =>'required',
        ]);
        if($validator->fails()){
            return response()->json(['errors'=>$validator->messages()]);
        }
        Note::create([
            'note'   =>$request->note,
            'user_id'=>$request->user_id,
            'team_id'=>$request->team_id,
        ]);
        return response()->json(['message'=>'Note added']);
    }

    public function getNotes(Request $request){
        $notes = Note::where(['user_id'=>$request->id,'role'=>'client'])->with('team')->get();
        return response()->json(['notes'=>$notes]);
    }

    public function deleteNote(Request $request){
        Note::where(['id'=>$request->id])->delete();
        return response()->json(['message'=>'Note deleted']);
    }
}
