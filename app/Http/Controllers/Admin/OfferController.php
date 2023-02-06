<?php

namespace App\Http\Controllers\Admin;

use App\Models\Offer;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class OfferController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        //
        
        $filter              = [];
        $filter['phone']    = $request->phone;
        $filter['client']    = $request->client_id;
        $filter['status']    = $request->status;
        $offers = Offer::with('client');

        if(isset($filter['client'])){
            $client            = $filter['client'];
            $offers            = $offers->whereHas('client', function($q) use ($client) {
                $q->where(function($q) use ($client) {
                    $q->where(DB::raw('id'), '=', $client);
                });
            });
        }
        
        if(isset($filter['phone'])){
            $phone             = $filter['phone'];
            $offers            = $offers->whereHas('client', function($q) use ($phone) {
                $q->where(function($q) use ($phone ) {
                    $q->where(DB::raw('phone'), '=', $phone);
                });
            });
        }
        if(isset($filter['status'])){
            $offers            = $offers->where('status', $filter['status']);
        }
        
        $offers = $offers->orderBy('id', 'desc')->paginate(20);
        return response()->json([
            'offers'=>$offers
        ],200);
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

            'client_id'    => ['required'],
            'status'       => ['required'],
        ]);
        if($validator->fails()){
            return response()->json(['errors'=>$validator->messages()]);
        }
       
        $input             = $request->input(); 
        Offer::create($input);
        
        return response()->json([
            'message' => 'Offer created successfully'
        ]);

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Offer  $offer
     * @return \Illuminate\Http\Response
     */
    public function show(Offer $offer)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Offer  $offer
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $offer = Offer::find($id)->get();
        return response()->json([
            'offer' => $offer
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Offer  $offer
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request,$id)
    {
        $validator  = Validator::make($request->all(),[

            'client_id'    => ['required'],
            'status'       => ['required'],
        ]);
        if($validator->fails()){
            return response()->json(['errors'=>$validator->messages()]);
        }
       
        $input = $request->input(); 
        Offer::where('id',$id)->update($input);
        
        return response()->json([
            'message' => 'Offer updated successfully'
        ]);
        
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Offer  $offer
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        Offer::find($id)->delete();
        return response()->json([
            'message'=>'Offer has been deleted successfully'
        ],200);
    }
}
