<html>
   <head>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
   </head>
   <body>
      <div class="container" style="margin-top:5%;">
      <center>
      <img src="{{asset('images/sample.svg')}}" style="margin-top:-60px;margin-bottom:5%;"/>
      </center>

         <div class="row">
            <div class="jumbotron" style="box-shadow: 2px 2px 4px #000000;">
               <h2 class="text-center">YOUR PAYMENT HAS BEEN RECEIVED</h2>
               <h3 class="text-center">Thank you for your payment, it’s processing</h3><br>
               <p class="text-center">Your Transaction Id is:<span style="color:green;font-weight:bold;"> {{ $invoice->txn_id }}</span></p>
               <p class="text-center">Paid amount is: <span style="color:green;font-weight:bold;"> {{ $pm.".00" }} ILS </span></p>
               <p class="text-center">Invoice Is is: <span style="color:green;font-weight:bold;">#000{{ $invoice->id }}</span></p>
               <p class="text-center"></p>
               <center>
                  <div class="btn-group" style="margin-top:50px;">
                     <a href="/" class="btn btn-lg btn-warning">CONTINUE</a>
                  </div>
               </center>
            </div>
         </div>
      </div>
      <body>
</html>