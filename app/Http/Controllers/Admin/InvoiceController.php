<?php

namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Invoices;

class InvoiceController extends Controller
{
    public function index(){
       $invoices = Invoices::with('client')->orderBy('created_at', 'desc')->paginate(20);
       return response()->json([
        'invoices' => $invoices
       ]);
  

    }
    public function AddInvoice( Request $request ){
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
}
