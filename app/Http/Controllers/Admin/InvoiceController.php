<?php

namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Invoices;
use App\Models\Job;
use App\Models\JobService;

class InvoiceController extends Controller
{
    public function index(){
       $invoices = Invoices::with('client')->orderBy('created_at', 'desc')->paginate(20);
       return response()->json([
        'invoices' => $invoices
       ]);
  

    }
    public function AddInvoice( Request $request ){
        
       
        $services = json_decode($request->data['services']);
       
        if(!empty($services)){
            foreach($services as $s){
                JobService::where('id',$s->id)->update(['order_status'=>1]);
            }
        }
        Invoices::create($request->data);
        
        return response()->json([
            'msg' => 'Invoice created successfully'
        ]);
    }
    public function getInvoice($id){
        $invoice = Invoices::where('id',$id)->with('client')->get()->first();
        return response()->json([
            'invoice' => $invoice
        ]);
    }
    public function updateInvoice( Request $request, $id ){
        Invoices::where('id',$id)->update($request->data);
        return response()->json([
            'msg' => 'Invoice Updated successfully'
        ]);
    }
    public function invoiceJobs( Request $request){
        $codes = $request->codes;
        if(!empty($codes)){
            $jservices = [];
            foreach($codes as $code){
                $job = Job::where('id',$code)->with('jobservice')->get()->first();
                $service = $job->jobservice[0]->toarray();
                $jservices[] = $service;
            }
            return response()->json([
                'services' => $jservices
            ]);
        }
    }

    public function generatePayment($nid){

        $id = base64_decode($nid);
        $invoice  = Invoices::where('id',$id)->with('client')->get()->first();
        $_services = json_decode($invoice->services);
        $client = $invoice->client;
        $services = array();
        foreach( $_services as $serv ){
           $services[] = [
            
            "Amount"       => $serv->price,
            "Currency"     => "ILS",
            "Name"         => $serv->service,
            "Description"  =>  $serv->description, 
            "Quantity"     =>  1,
            "Image"        =>  "" ,
            "IsTaxFree"    =>  "false",
            "AdjustAmount" => "false"
            
           ];
        }
        $se = json_encode($services);

        $username = '0882016016';
        $password = 'Z0882016016';

        $data = '{
            "Key": "'.env("ZCREDIT_KEY").'",
            "Local": "He",
            "UniqueId": "",
            "SuccessUrl": "'.url('/record-invoice?cb='.$nid).'",
            "CancelUrl": "",
            "CallbackUrl": "'.url('/record-invoice?cb='.$nid).'",
            "PaymentType": "regular",
            "CreateInvoice": "false",
            "AdditionalText": "",
            "ShowCart": "true",
            "ThemeColor": "005ebb",
            "BitButtonEnabled": "true",
            "ApplePayButtonEnabled": "true",
            "GooglePayButtonEnabled": "true",   
            "Installments": {
                "Type": "regular" , 
                "MinQuantity": "1",
                "MaxQuantity": "1"
            },
            "Customer": {
                "Email": "'.$client->email.'",
                "Name": "'.$client->firstname." ".$client->lastname.'" ,
                "PhoneNumber":  "'.$client->phone.'",
                "Attributes": {
                    "HolderId":  "none" ,
                    "Name":  "required" ,
                    "PhoneNumber":  "optional" ,
                    "Email":  "optional"
                }
            },
        "CartItems": '.$se.',

            "FocusType": "None",
            "CardIcons": {
                "ShowVisaIcon": "true",
                "ShowMastercardIcon": "true",
                "ShowDinersIcon": "true",
                "ShowAmericanExpressIcon": "true",
                "ShowIsracardIcon": "true",
            },
            "IssuerWhiteList": "1,2,3,4,5,6",
            "BrandWhiteList": "1,2,3,4,5,6",
            "UseLightMode": "false",
            "UseCustomCSS": "false"
        }';
       
        $curl = curl_init();

            curl_setopt_array($curl, array(
            CURLOPT_URL => 'https://pci.zcredit.co.il/webcheckout/api/WebCheckout/CreateSession',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'POST',
            CURLOPT_USERPWD => $username . ":" . $password,
            
            CURLOPT_POSTFIELDS =>$data,
            CURLOPT_HTTPHEADER => array(
                'Content-Type: application/json'
            ),
            ));

            $response = curl_exec($curl);
            $re = json_decode($response);
            if($re->HasError == true){
                die('Something went wrong ! Please contact Administrator !');
            }
            Invoices::where('id',$id)->update(['session_id'=>$re->Data->SessionId]);
            return redirect($re->Data->SessionUrl);
    }
    public function recordInvoice(Request $request){
      
        $id = base64_decode($request->cb);
        $invoice = Invoices::where('id',$id)->get()->first();
        $sid = $invoice->session_id;
        $key = env('ZCREDIT_KEY');
       
    if(is_null($invoice->callback)):

        $curl = curl_init();
      
        curl_setopt_array($curl, array(
            CURLOPT_URL => 'https://pci.zcredit.co.il/webcheckout/api/WebCheckout/GetSessionStatus',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'POST',
            CURLOPT_POSTFIELDS =>'{
            "Key": "'.$key.'",
            "SessionId": "'.$sid.'"
            }',
            CURLOPT_HTTPHEADER => array(
                'Content-Type: application/json'
            ),
        ));

        $response = curl_exec($curl);
        $re = json_decode($response);
        curl_close($curl);
        $cb = json_decode($re->CallBackJSON);
        if(!empty($cb)){
           $args = [
             'callback' => $re->CallBackJSON,
             'paid_amount' => $cb->Total,
             'status' => 'paid',
             'txn_id' => $re->TransactionID,
           ];

        $services = json_decode($invoice->services);
    
        if(!empty($services)){
            foreach($services as $s){
                JobService::where('id',$s->id)->update(['pay_status'=>1]);
            }
        }
       
        Invoices::where('id',$id)->update($args);
        } else {
            die('Something went wrong ! Please contact Administrator !');
        }
       
    endif;
    return redirect('thanks?cb='.$request->cb.'');
     
    }

    public function displayThanks(Request $request){
        $invoice = Invoices::where('id',base64_decode($request->cb))->with('client')->get()->first();
        $pm = json_decode($invoice->callback)->Total;
        return view('thanks',compact('invoice','pm'));
    
    } 
    public function deleteInvoice($id){
        Invoices::where('id',$id)->delete();
    }
}
