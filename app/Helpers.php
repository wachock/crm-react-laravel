<?php

namespace App\Helpers;

use App\Mail\MailInvoiceToClient;
use App\Models\Invoices;
use App\Models\Job;
use Mail;
use PDF;
class Helper {

    public static function sendInvoicePayToClient($id, $docurl, $docnum, $inv_id){
        
       
        $job = Job::where('id',$id)->with('client')->get()->first();
        $job = $job->toArray();
        
        $data = array(
            'docurl' => $docurl,
            'docnum' => $docnum,
            'id'     => $id,
            'job'    => $job,
            'inv_id' => $inv_id
        );
       // $pdf = PDF::loadView('InvoicePdf', compact('invoice'));
      
       
        // Mail::send('/Mails/MailInvoiceToClient',$data,function($messages) use ($data){
        //         $messages->to($data['job']['client']['email']);
        //         $sub = __('invoice.pdf.mailsubject')." #".$data['docnum'];
        //         $messages->subject($sub);
        //         //$messages->attachData($pdf->output(), 'Invoice_000'.$id.'.pdf');
        // });

        Mail::to($data['job']['client']['email'])->send(new MailInvoiceToClient($data));
    }

}