<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Schedule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;

class ScheduleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $schedule = Schedule::with('team','client');
        $schedule = $schedule->orderBy('id','desc')->paginate(10);
        return response()->json([
            'schedules' => $schedule
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
        $validator  = Validator::make($request->all(),[

            'client_id'      => ['required'],
            'team_id'        => ['required'],
            'start_date'     => ['required'],
            'start_time'     => ['required'],
            'end_time'       => ['required'],
            'booking_status' => ['required'],
        ]);
        if($validator->fails()){
            return response()->json(['errors'=>$validator->messages()]);
        }
       
        $input  = $request->input(); 
        Schedule::create($input);
        
        return response()->json([
            'message' => 'Metting scheduled  successfully'
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Schedule  $schedule
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $schedule = Schedule::where('id',$id)->get();
        return response()->json([
            'schedule' => $schedule
        ]);
    }

    public function getEvents(Request $request){
        $events = Schedule::where('team_id',$request->tid)->get();
        $evn = [];
        if(isset($events)):
        foreach($events as $event):

            $ar = [];
            $ar["id"]         = $event['id'];
            $ar["title"]      = 'Busy';
            $ar["start"]      = Carbon::parse($event['start_date'])->format('Y-m-d');
            $ar["timePeriod"] = "10:00 - 11:00" ;
            array_push($evn,$ar);

        endforeach;
        endif;

        return response()->json([
            'events' => $evn
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Schedule  $schedule
     * @return \Illuminate\Http\Response
     */
    public function edit(Schedule $schedule)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Schedule  $schedule
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request,$id)
    {
        $change  = '';
        if($request->name == 'start_date'){
            Schedule::where('id',$id)->update([
                'booking_status' => 'pending',
                'start_date'     => $request->value,
                'start_time'     => '',
                'end_time'       => ''
            ]);
            $change = 'date';
        } else {

            Schedule::where('id',$id)->update([
                $request->name => $request->value
            ]);
            $change = "other";
        }
        return response()->json([
            'message' => str_replace('_',' ',$request->name)." has been updated",
            'change'  =>$change
        ]);
        
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Schedule  $schedule
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Schedule::where('id',$id)->delete();
        return response()->json([
            'message'=> 'Meeting has been deleted'
        ]);
    }
    public function ClientSchedules(Request $request){
        
        $schedules = Schedule::with('team')->where('client_id',$request->id)->get();
        return response()->json([
            'schedules'=>$schedules
        ]); 
    }
}
