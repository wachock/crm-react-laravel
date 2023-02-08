<?php

namespace App\Http\Controllers\Admin;

use App\Models\Offer;
use App\Models\Client;
use App\Models\Services;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Mail;

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
            'services'     => ['required']
        ]);
        if($validator->fails()){
            return response()->json(['errors'=>$validator->messages()]);
        }
       
        $input             = $request->input(); 
        $ofr = Offer::create($input);
        $offer = Offer::where('id',$ofr->id)->with('client','service')->get()->first();
        $this->sendOfferMail($offer);
        return response()->json([
            'message' => 'Offer created successfully'
        ]);

    }

    public function sendOfferMail($offer)
    {
    if(isset($offer)):
        $offer = $offer->toArray();
        $services = ($offer['services'] != '')? json_decode($offer['services']) : [];
        if(isset($services)){
            $serv = [];
            $s_names  = '';
            foreach($services as $service){
                $ar = Services::where('id',$service->service)->get('name')->toArray();
                array_push($serv,$ar);
            }
            
            if(isset($serv)){
                foreach($serv as $k => $s){
                    if($k != count($serv)-1)  
                    $s_names .= $s[0]['name'].", ";
                    else
                    $s_names .= $s[0]['name'];
                }
            }
            $offer['service_names'] = $s_names;
        }
    
        Mail::send('/Mails/OfferMail',$offer,function($messages) use ($offer){
            $messages->to($offer['client']['email']);
            $messages->subject('Offer recieved from Broom Services');
        });

    endif;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Offer  $offer
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $offer = Offer::where('id',$id)->with('client')->get()->first();
        $services = ($offer->services != '') ? json_decode($offer->services) : [];
        if(isset($services)){
            foreach( $services as $service){
               $name = Services::where('id',$service->service)->get('name')->first()->toArray(); 
               $service->name = $name['name'];
            }
            $offer->services = json_encode($services);
        }
       
        return response()->json([
            'offer' => $offer
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Offer  $offer
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $offer = Offer::where('id',$id)->get();
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

    public function ClientOffers(Request $request){
         
        $offers = Offer::with('client')->where('client_id',$request->id)->get();
        return response()->json([
            'offers' => $offers
        ]);
    }

    public function AcceptOffer(Request $request){
       Offer::where('id',$request->id)->update([
         'status' =>'accepted'
       ]);
       return response()->json([
        'message' => 'Offer is accepted'
       ]);
    }
}
