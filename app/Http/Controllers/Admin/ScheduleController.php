<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Schedule;
use App\Models\Offer;
use App\Models\Services;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Mail;
class ScheduleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {

        $q = $request->q;
        $result = Schedule::query()->with('client','team');
        $result->orWhere('booking_status','like','%'.$q.'%');
        $result->orWhere('end_time',       'like','%'.$q.'%');
        $result->orWhere('start_date',     'like','%'.$q.'%');
        $result->orWhere('start_time', 'like','%'.$q.'%');

        $result = $result->orWhereHas('client',function ($qr) use ($q){
             $qr->where(function($qr) use ($q) {
                 $qr->where(DB::raw('firstname'), 'like','%'.$q.'%');
                 $qr->orWhere(DB::raw('lastname'), 'like','%'.$q.'%');
                 $qr->orWhere(DB::raw('city'), 'like','%'.$q.'%');
                 $qr->orWhere(DB::raw('street_n_no'), 'like','%'.$q.'%');
                 $qr->orWhere(DB::raw('zipcode'), 'like','%'.$q.'%');
                 $qr->orWhere(DB::raw('phone'), 'like','%'.$q.'%');
             });
         });

         $result = $result->orWhereHas('team',function ($qr) use ($q){
            $qr->where(function($qr) use ($q) {
                $qr->where(DB::raw('name'), 'like','%'.$q.'%');
            });
        });
 
         $result = $result->orderBy('id', 'desc')->paginate(20);
 
         return response()->json([
             'schedules' => $result
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
            'start_date'     => ['required'],
            'start_time'     => ['required'],
            'end_time'       => ['required'],
            'booking_status' => ['required'],
        ]);
        if($validator->fails()){
            return response()->json(['errors'=>$validator->messages()]);
        }
       
        $input  = $request->input(); 
        $sch = Schedule::create($input);
        $schedule = Schedule::where('id',$sch->id)->with('client','team')->get()->first();
        $this->sendMeetingMail($schedule);
        return response()->json([
            'message' => 'Metting scheduled  successfully'
        ]);
    }

    public function sendMeetingMail($sch){
        
       $sch = $sch->toArray();
       $services = Offer::where('client_id',$sch['client']['id'])->get()->last();
       $str = '';
      
       if(!empty($services->services)){

         $allServices = json_decode($services->services);
         foreach($allServices as $k=> $serv){

            if($k != count($allServices)-1)
            $str .= $serv->name.", ";
            else
            $str .= $serv->name;
         }

       } 
        $sch['service_names'] = $str; 
        \App::setLocale($sch['client']['lng']);
        Mail::send('/Mails/MeetingMail',$sch,function($messages) use ($sch){
            $messages->to($sch['client']['email']);
            $sub = __('mail.meeting.subject')." ".__('mail.meeting.from')." ".__('mail.meeting.company');
            $messages->subject($sub);
        });
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Schedule  $schedule
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $schedule = Schedule::where('id',$id)->with('client','team')->get()->first();
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
            $ar["start"]      = date_format(date_create($sd.$event['start_time']) ,'Y-m-d H:i:s');
            $ar["end"]        = date_format(date_create($sd.$event['end_time']) ,'Y-m-d H:i:s');
            $ar["start_time"] = $event['start_time'];
        
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
        
        $schedules = Schedule::with('team')->where('client_id',$request->id)->orderBy('id','desc')->get();
        return response()->json([
            'schedules'=>$schedules
        ]); 
    }
    public function getLatestClientSchedule(Request $request){
        $latestSchedule = Schedule::where('client_id',$request->id)->get()->last();
        return response()->json([
            'latestSchedule'=>$latestSchedule
        ]); 
    }
}
