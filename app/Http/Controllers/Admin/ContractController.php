<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Contract;
use App\Models\Job;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class ContractController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        
        $q = $request->q;
        $result = Contract::query()->with('client','offer');  
        
        $result->orWhere('status','like','%'.$q.'%');
        
        $result = $result->orWhereHas('client',function ($qr) use ($q){
             $qr->where(function($qr) use ($q) {
                 $qr->where(DB::raw('firstname'), 'like','%'.$q.'%');
                 $qr->orWhere(DB::raw('lastname'), 'like','%'.$q.'%');
                 $qr->orWhere(DB::raw('email'), 'like','%'.$q.'%');
                 $qr->orWhere(DB::raw('city'), 'like','%'.$q.'%');
                 $qr->orWhere(DB::raw('street_n_no'), 'like','%'.$q.'%');
                 $qr->orWhere(DB::raw('zipcode'), 'like','%'.$q.'%');
                 $qr->orWhere(DB::raw('phone'), 'like','%'.$q.'%');
             });
         });
 
         $result = $result->orderBy('id', 'desc')->paginate(20);
 
        return response()->json([
            'contracts'=>$result
        ],200);

    }

    public function clientContracts(Request $request){
       
        $contracts = Contract::where('client_id',$request->id)->with('offer')->orderBy('id','desc')->paginate(20);
        $latest   = Contract::where('client_id',$request->id)->get()->last();
        return response()->json([
            'contracts' => $contracts,
            'latest'    => $latest
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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Contract  $contract
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $contracts = Contract::with('offer','client')->find($id);
        return response()->json([
            'contract'     => $contracts         
        ], 200);

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Contract  $contract
     * @return \Illuminate\Http\Response
     */
    public function edit(Contract $contract)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Contract  $contract
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Contract $contract)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Contract  $contract
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Contract::find($id)->delete();
        return response()->json([
            'message'     => "Client has been deleted"         
        ], 200);
    }
    public function getContract(Request $request){
       
        $contract = Contract::where('id',$request->id)->get();
        return response()->json([
            'contract'=>$contract
        ],200);
    }
    public function verifyContract(Request $request){
        Contract::where('id',$request->id)->update([
            'status'=>'verified'
        ]);
        $contract = Contract::where('id',$request->id)->get()->first();
        Job::create([
            'client_id'=>$contract->client_id,
            'offer_id'=>$contract->offer_id,
            'contract_id'=>$request->id,
            'status'=>'unscheduled',
        ]);
        return response()->json([
             'message' => 'Contract verified successfully'
        ]);
    }
}
