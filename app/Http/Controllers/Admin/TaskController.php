<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $filter                     = [];
        $filter['task']            = $request->task;       
        $filter['status']           = $request->status;

        $tasks              = Task::query();

        if(isset($filter['task'])){
            $tasks          = $tasks->where('task', 'LIKE', '%'.$filter['task'].'%');
        }
       
        if(isset($filter['status'])){
            $tasks          = $tasks->where('status', $filter['status']);
        }

        $tasks              = $tasks->orderBy('id', 'desc')->paginate(20);

        return response()->json([
            'tasks'         => $tasks,        
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
            'task'       => ['required', 'string', 'max:255'],           
            'status'      => ['required'],           
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->messages()]);
        }

        $input                  = $request->all();        
        $task                   = Task::create($input);

        return response()->json([
            'message'       => 'Task created successfully',            
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
        $task                = Task::find($id);

        return response()->json([
            'task'       => $task,        
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
            'task' => ['required', 'string', 'max:255'],           
            'status'      => ['required'],           
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->messages()]);
        }

        $input                  = $request->all();        
        $task                   = Task::where('id', $id)->update($input);

        return response()->json([
            'message'       => 'Task updated successfully',            
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
        Task::find($id)->delete();
        return response()->json([
            'message'     => "Task has been deleted"         
        ], 200);
    }
}
