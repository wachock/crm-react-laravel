<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Job;
use App\Models\Review;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ReviewController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $filter                     = [];
        $filter['author']           = $request->author;
        $filter['rating']           = $request->rating;  
        $filter['date']             = $request->date;     
        $filter['status']           = $request->status;

        $reviews              = Review::with('job');

        if(isset($filter['author'])){
            $reviews          = $reviews->where('author', 'LIKE', '%'.$filter['author'].'%');
        }       

        if(isset($filter['rating'])){
            $reviews          = $reviews->where('rating', $filter['rating']);
        }

        if(isset($filter['date'])){
            $reviews          = $reviews->where('date', $filter['date']);
        }
       
        if(isset($filter['status'])){
            $reviews          = $reviews->where('status', $filter['status']);
        }

        $reviews              = $reviews->orderBy('id', 'desc')->paginate(20);

        return response()->json([
            'reviews'         => $reviews,        
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $jobs = Job::get(['id', 'title']);
        return response()->json([
            'jobs'         => $jobs,        
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
            'author'      => ['required', 'string', 'max:255'],   
            'job_id'      => ['required'], 
            'rating'      => ['required'],
            'review'      => ['required'],
            'date'        => ['required'],           
            'status'      => ['required'],           
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->messages()]);
        }

        $input                  = $request->all();
        $input['date']          = Carbon::parse($request->date)->format('Y-m-d');        
        $review                 = Review::create($input);

        return response()->json([
            'message'       => 'Review created successfully',            
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
        $review                = Review::find($id);

        return response()->json([
            'review'       => $review,        
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
            'author'      => ['required', 'string', 'max:255'],   
            'job_id'      => ['required'], 
            'rating'      => ['required'],
            'review'      => ['required'],
            'date'        => ['required'],           
            'status'      => ['required'],             
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->messages()]);
        }

        $input                  = $request->all();
        $input['date']          = Carbon::parse($request->date)->format('Y-m-d');        
        $review                 = Review::where('id', $id)->update($input);

        return response()->json([
            'message'       => 'Review updated successfully',            
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
        Review::find($id)->delete();
        return response()->json([
            'message'     => "Review has been deleted"         
        ], 200);
    }
}
