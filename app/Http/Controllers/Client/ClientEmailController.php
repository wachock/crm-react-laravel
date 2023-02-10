<?php
namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Client;
use App\Models\Schedule;
use App\Models\Offer;
use App\Models\Services;
use App\Models\Contract;
use Mail;

class ClientEmailController extends Controller
{
     public function ShowMeeting(Request $request){

       $id = $request->id;
       $schedule = Schedule::where('id',$id)->with('client','team')->get()->first();

       $services = Offer::where('client_id',$schedule->client->id)->get()->last();
       $str = '';
       if(!empty($services->services)){
         
         $allServices = json_decode($services->services);
         foreach($allServices as $k=> $serv){
            $s = Services::where('id',$serv->service)->get('name')->first()->toArray();
            if($k != count($s))
            $str .= $s['name'].", ";
            else
            $str .= $s['name'];
         }

       } 
       $schedule->service_names = $str; 
       return response()->json([
           'schedule' => $schedule
       ]);

     }
     
     public function GetOffer(Request $request){

      $id = $request->id;
      $offer = Offer::where('id',$id)->with('client')->get();
      $services = ($offer[0]->services != '') ? json_decode($offer[0]->services) : [];
      if(isset($services)){

          foreach( $services as $service){
             $name = Services::where('id',$service->service)->get('name')->first()->toArray(); 
             $service->name = $name['name'];
          }
          $offer[0]->services = json_encode($services);
      }
     
      return response()->json([
          'offer' => $offer
      ]);
     }

     public function AcceptOffer(Request $request)
     {

       Offer::where('id',$request->id)->update([
        'status' =>'accepted'
      ]);
      $ofr  = Offer::with('client')->where('id',$request->id)->get()->first()->toArray();
      $hash = md5($ofr['client']['email']); 
      
      $contract = Contract::create([
         'offer_id'   =>$request->id,
         'client_id'  =>$ofr['client']['id'],
         'unique_hash'=>$hash,
         'status'     =>'Not Signed'
      ]);
          $ofr['contract_id'] = $hash;
      
      Mail::send('/Mails/ContractMail',$ofr,function($messages) use ($ofr){
        $messages->to($ofr['client']['email']);
        $messages->subject('Contract with Broom Services');
      });
      
      return response()->json([
       'message' => 'Offer is accepted'
      ],200);

   }

   public function AcceptMeeting(Request $request){
    
    try{
      
    Schedule::where('id',$request->id)->update([
      'booking_status' =>'confirmed'
    ]);
    return response()->json([
     'message' => 'Thanks, your meeting is confirmed'
    ],200);

   } catch (\Exception $e) {

    return $e->getMessage();
   }
   }
   
   public function AcceptContract(Request $request){
     
    try{
      Contract::where('unique_hash',$request->unique_hash)->update($request->input());
      return response()->json([
        'message'=>"Thanks, for accepting contract"
       ],200);

    } catch(\Exception $e){
      
       return response()->json([
        'error'=>$e->getMessage()
       ],200);
    }
    
  }

  public function GetOfferFromHash(Request $request){

      $offer = Contract::where('unique_hash',$request->token)->get()->last();
      $goffer = Offer::where('id',$offer->offer_id)->with('client')->get();
      return response()->json([
        'offer' => $goffer
      ]);
  }

}

