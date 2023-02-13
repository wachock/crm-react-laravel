<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
	<title>Work Contract</title>
</head>
<body style="font-family: 'Open Sans', sans-serif;color: #212529;background: #fcfcfc;">
	<div style="max-width: 650px;margin: 0 auto;margin-top: 30px;margin-bottom: 20px;background: #fff;border: 1px solid #e6e8eb;border-radius: 6px;padding: 20px;">
		<table cellpadding="0" cellspacing="0" width="100%" >
			<tr>
				<td width="100%">
					<img src="http://broom-service.n2rtech.com/images/logo.png" style="margin: 0 auto;display: block">
				</td>
			</tr>
		</table>
		<h1 style="text-align: center;">Hi, {{$client['firstname']}} {{$client['lastname']}}</h1>
		<p style="text-align: center;line-height: 30px">Greeting from Broom Services. A work agreement for digital signature is attached. Please fill in the necessary details and sign on the last page for payment details you must fill in the details of each ID number and the signature of the card holder without the CVV details which you will give us over the phone in order to save and secure your payment details and with your signature below for any questions please contact us: 03- 525-70-60 or reply to this email.</p>
		<p style="text-align: center;">Click the below button to check the contract.</p>
		<div style="text-align: center;">
			<a href='{{ url("work-contract/".$contract_id)}}' style="background: #ef6c6b;color: #fff;border: 1px solid #ef6c6b;font-size: 16px;padding: 10px 24px;border-radius: 4px;cursor: pointer;text-decoration: none;margin-top: 25px;margin-bottom: 25px">Check contract</a> 
		</div>
		<p style="margin-top: 40px">If you have any questions or concerns please don't hesitate to get in touch with us by replying to this email.</p>
		<p style="font-weight: 700;margin-bottom: 0;">Best Regards</p>
		<p style="margin-top: 3px;font-size: 14px;margin-bottom: 3px;">Broom services</p>
		<p style="margin-top: 3px;font-size: 14px;margin-bottom: 3px">Telephone: 03-525-70-60</p>
		<p style="margin-top: 3px;font-size: 14px;margin-bottom: 3px"><a href="mailto:office@broomservice.co.il">office@broomservice.co.il</a></p>
	</div>
</body>
</html>