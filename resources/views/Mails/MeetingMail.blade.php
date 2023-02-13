<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
	<title>Schedule meeting</title>
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
		<p style="text-align: center;">Greeting from Broom Services. Just a friendly reminder that you have an upcoming appointement with <span style="color:#0130c6;font-weight:700;">{{$team['name']}}</span>
		 on     <span style="color:#0130c6;font-weight:700;">{{ \Carbon\Carbon::parse($start_date)->format('d-m-Y')}}</span>
		 between <span style="color:#0130c6;font-weight:700;">{{$start_time}}</span>
		 to      <span style="color:#0130c6;font-weight:700;">{{$end_time}}</span>
		 for    <span style="color:#0130c6;font-weight:700;">{{$service_names}}</span> service.</p>
		<div style="display:flex;justify-content: center">
			<a href='#' target='_blank' style="background: green;color: #fff;border: 1px solid green;font-size: 16px;padding: 10px 24px;border-radius: 4px;cursor: pointer;text-decoration: none;min-width:135px;text-align: center">Accept</a>
			<a href='#' target='_blank' style="background: red;color: #fff;border: 1px solid red;font-size: 16px;padding: 10px 24px;border-radius: 4px;cursor: pointer;text-decoration: none;min-width:135px;margin: 0 15px;text-align: center">Reject</a>
			<a href='{{ url("meeting-status/".$id)}}' target='_blank' style="background: #4385f5;color: #fff;border: 1px solid #4385f5;font-size: 16px;padding: 10px 24px;border-radius: 4px;cursor: pointer;text-decoration: none;text-align: center">Reschedule</a>
		<!-- <a href='{{ url("meeting-status/".$id)}}' target="_blank" style="text-decoration:none;background: #ef6c6b;color: #fff;border: 1px solid #ef6c6b;font-size: 16px;padding: 10px 24px;border-radius: 4px;cursor: pointer">Update meeting status</a>  -->
		</div>
		<p style="margin-top: 20px">If you have any questions or concerns please don't hesitate to get in touch with us by replying to this email.</p>
		<p style="font-weight: 700;margin-bottom: 0;">Best Regards</p>
		<p style="margin-top: 3px;font-size: 14px;margin-bottom: 3px;">Broom services</p>
		<p style="margin-top: 3px;font-size: 14px;margin-bottom: 3px">Telephone: 03-525-70-60</p>
		<p style="margin-top: 3px;font-size: 14px;margin-bottom: 3px"><a href="mailto:office@broomservice.co.il">office@broomservice.co.il</a></p>
	</div>
</body>
</html>