<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use App\Models\WorkerAvialibilty;

class WorkerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
   
        $q = $request->q;
        $result = User::query();
        $result->where('firstname',  'like','%'.$q.'%');
        $result->orWhere('lastname', 'like','%'.$q.'%');
        $result->orWhere('phone',    'like','%'.$q.'%');
        $result->orWhere('address',  'like','%'.$q.'%');
        $result->orWhere('status',   'like','%'.$q.'%');
        // $result->orWhere('email',    'like','%'.$q.'%');

        $result = $result->orderBy('id', 'desc')->paginate(20);

        return response()->json([
            'workers'       => $result,            
        ], 200);
    }

    public function AllWorkers(){
        
        $workers = User::where('status',1)->get();
        return response()->json([
            'workers'       => $workers,            
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
            'address'   => ['required', 'string'],
            'phone'     => ['required'],
            'worker_id' => ['required','unique:users'],
            'status'    => ['required'],
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->messages()]);
        }

        $worker                = new User;
        $worker->firstname     = $request->firstname;
        $worker->lastname      = $request->lastname;
        $worker->phone         = $request->phone;
        $worker->email         = $request->email;
        $worker->address       = $request->address;
        $worker->renewal_visa  = $request->renewal_visa;
        $worker->gender        = $request->gender;
        $worker->payment_per_hour  = $request->payment_hour;
        $worker->worker_id     = $request->worker_id;
        $worker->passcode      = $request->password;
        $worker->password      = Hash::make($request->password);
        $worker->skill         = $request->skill;
        $worker->status        = $request->status;
        $worker->save();

        return response()->json([
            'message'       => 'Employer updated successfully',            
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
        $worker                = User::find($id);
        return response()->json([
            'worker'        => $worker,            
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
            'worker_id' => ['required','unique:users,worker_id,'.$id],
            'status'    => ['required'],
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->messages()]);
        }

        $worker                = User::find($id);
        $worker->firstname     = $request->firstname;
        $worker->lastname      = $request->lastname;
        $worker->phone         = $request->phone;
        $worker->email         = $request->email;
        $worker->address       = $request->address;
        $worker->renewal_visa  = $request->renewal_visa;
        $worker->gender        = $request->gender;
        $worker->payment_per_hour  = $request->payment_hour;
        $worker->worker_id     = $request->worker_id;
         $worker->passcode     = $request->password;
        $worker->password      = Hash::make($request->password);
        $worker->skill         = $request->skill;
        $worker->status        = $request->status;
        $worker->save();

        return response()->json([
            'message'       => 'Worker updated successfully',            
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
            'message'     => "Worker has been deleted"         
        ], 200);
    }
    public function updateAvailability(Request $request,$id){
        WorkerAvialibilty::where('user_id',$id)->delete();
        foreach($request->data as $key=>$availabilty){
           $avl = new WorkerAvialibilty;
           $avl->user_id=$id;
           $avl->date=trim($key);
           $avl->working=$availabilty;
           $avl->status='1';
           $avl->save();
        }
        return response()->json([
            'message'     => 'Updated Successfully',         
        ], 200);
    } 
    public function getWorkerAvailability($id){
          $worker_availabilities = WorkerAvialibilty::where('user_id',$id)
                             ->orderBy('id', 'asc')
                             ->get();
            $new_array=array();
            foreach($worker_availabilities as $w_a){
                 $new_array[$w_a->date]=$w_a->working;
            }

           return response()->json([
            'availability'     => $new_array,         
           ], 200);
    }
     public function getALLWorkerAvailability(){
           $allslot =  [
                 '8am-16pm'=>array('08:00','16:00'),
                 '8am-10am'=>array('08:00','10:00'),
                 '10am-12pm'=>array('10:00','12:00'),
                 '12pm-14pm'=>array('12:00','14:00'),
                 '14pm-16pm'=>array('14:00','16:00'),
                 '12pm-16pm'=>array('12:00','16:00'),
                 '16pm-18pm'=>array('16:00','18:00'),
                 '18pm-20pm'=>array('18:00','20:00'),
                 '16pm-20pm'=>array('16:00','20:00'),
                 '20pm-22pm'=>array('20:00','22:00'),
                 '22pm-24am'=>array('22:00','00:00'),
                 '20pm-24am'=>array('20:00','00:00'),

                ];
          $worker_availabilities = WorkerAvialibilty::orderBy('id', 'asc')->get();
            $new_array=array();
            foreach($worker_availabilities as $w_a){
                 foreach($w_a->working as $key=>$slot){
                       $new_array[]=array(
                          'id'=>$w_a->id.'_'.$key,
                          'worker_id'=>$w_a->user_id,
                          'date'=>$w_a->date,
                          'start_time'=>$allslot[$slot][0],
                          'end_time'=>$allslot[$slot][1],


                       );
                 }
            }

           return response()->json([
            'availability'     => $new_array,         
           ], 200);
    }
}
