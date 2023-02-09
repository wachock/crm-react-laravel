<?php
namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Client;
use App\Models\Schedule;
use App\Models\Offer;
use App\Models\Services;


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

     public function AcceptOffer(Request $request)
     {

      Offer::where('id',$request->id)->update([
        'status' =>'accepted'
      ]);
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


}

