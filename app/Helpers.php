<?php

namespace App\Helpers;
use App\Models\Invoices;
use Mail;
use PDF;
class Helper {

    public static function sendInvoiceToClient($id){
        
        $invoice = Invoices::where('id',$id)->with('client')->get()->first();
        $pdf = PDF::loadView('InvoicePdf', compact('invoice'));
      
        $inv = $invoice->toArray();
        Mail::send('/Mails/MailInvoiceToClient',$inv,function($messages) use ($inv,$id,$pdf){
                $messages->to($inv['client']['email']);
                $sub = __('invoice.pdf.mailsubject')." #000".$id;
                $messages->subject($sub);
                $messages->attachData($pdf->output(), 'Invoice_000'.$id.'.pdf');
        });
    }

}