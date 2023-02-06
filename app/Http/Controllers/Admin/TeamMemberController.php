<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\TeamMember;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TeamMemberController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $team = TeamMember::query();
        $team = $team->orderBy('id','desc')->paginate(10);
        return response()->json([
            'team' => $team
        ]);
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
        $validator = Validator::make($request->all(),[
            'name' =>['required'],
            'email'     => ['required', 'string', 'email', 'max:255', 'unique:team_members'],
            'phone'=>['required'],
            'password'=>['required','min:6','required_with:confirmation','same:confirmation'],
            'status' =>['required'],
        ]);
        if($validator->fails()){
            return response()->json(['errors'=>$validator->messages()]);
        }
        TeamMember::create($request->input());
        return response()->json([
            'message'=>'Team member added successfully'
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\TeamMember  $teamMember
     * @return \Illuminate\Http\Response
     */
    public function show(TeamMember $teamMember)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\TeamMember  $teamMember
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $member = TeamMember::where('id',$id)->get();
        return response()->json([
            'member'=>$member
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\TeamMember  $teamMember
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
         $validator = Validator::make($request->all(),[
            'name' =>['required'],
            'email'     => ['required', 'string', 'email', 'max:255', 'unique:team_members,email,'.$id],
            'phone'=>['required'],
            'password'=>['required','min:6','required_with:confirmation','same:confirmation'],
            'status' =>['required'],
        ]);
        if($validator->fails()){
            return response()->json(['errors'=>$validator->messages()]);
        }
        $request = $request->except(['confirmation']);
        TeamMember::where('id',$id)->update($request);
        return response()->json([
            'message'=>'Team member updated successfully'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\TeamMember  $teamMember
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        TeamMember::find($id)->delete();
        return response()->json([
            'message'=>'Team member deleted successfully'
        ]);
    }
}
