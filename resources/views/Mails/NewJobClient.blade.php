<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
	<title>Job Details</title>
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
		<h1 style="text-align: center;">{{__('mail.client_new_job.hi')}}, {{ $name }}</h1>
		<p style="text-align: center;line-height: 30px">{{__('mail.client_new_job.greetings')}} {{__('mail.client_new_job.from')}} {{__('mail.client_new_job.company')}}. {{__('mail.client_new_job.content')}}</p>
		<table cellpadding="0" cellspacing="0" width="100%">
			 <thead>
				<tr>
					<th width="" style="text-align:left;border: 1px solid #dee2e6;font-size: 14px;padding: 8px">Date</th>
					<th width="" style="text-align:left;border: 1px solid #dee2e6;font-size: 14px;padding: 8px">Worker</th>
					<th width="" style="text-align:left;border: 1px solid #dee2e6;font-size: 14px;padding: 8px">Service</th>
					<th width="" style="text-align:left;border: 1px solid #dee2e6;font-size: 14px;padding: 8px">Shift</th>
					<th width="" style="text-align:left;border: 1px solid #dee2e6;font-size: 14px;padding: 8px">Status</th>
					<th width="" style="text-align:left;border: 1px solid #dee2e6;font-size: 14px;padding: 8px">Action</th>
				</tr>
			</thead>
			<tbody>
				@foreach($jobs as $job)
				<tr>
					<td style="border: 1px solid #dee2e6;font-size: 14px;padding: 8px">{{ \Carbon\Carbon::parse($job['job']['start_date'])->format('M d Y') }}</td>
					<td style="border: 1px solid #dee2e6;font-size: 14px;padding: 8px">{{ $job["job"]['worker']['firstname'] }} {{ $job["job"]['worker']['lastname'] }}</td>
					<td style="border: 1px solid #dee2e6;font-size: 14px;padding: 8px">{{ $job["job"]['jobservice']['name'] }}</td>
					<td style="border: 1px solid #dee2e6;font-size: 14px;padding: 8px">{{ $job["job"]['start_time'] }} to {{ $job["job"]['end_time'] }}</td>
					<td style="border: 1px solid #dee2e6;font-size: 14px;padding: 8px">{{ ucfirst($job["job"]['status']) }}</td>
					<td style="border: 1px solid #dee2e6;font-size: 14px;padding: 8px;display:flex;height: 38px">
						<a href='{{ url("worker/client-job/".$job["job"]["id"] ) }}' style="font-size: 13px;color: #007bff;min-width: 51px">View Job</a>
					</td>
				</tr>
				@endforeach
			</tbody>
			</table>
		<p style="margin-top: 40px">{{__('mail.client_new_job.reply_txt')}}</p>
		<p style="font-weight: 700;margin-bottom: 0;">{{__('mail.client_new_job.regards')}}</p>
		<p style="margin-top: 3px;font-size: 14px;margin-bottom: 3px;">{{__('mail.client_new_job.company')}}</p>
		<p style="margin-top: 3px;font-size: 14px;margin-bottom: 3px">{{__('mail.client_new_job.tel')}}: 03-525-70-60</p>
		<p style="margin-top: 3px;font-size: 14px;margin-bottom: 3px"><a href="mailto:office@broomservice.co.il">office@broomservice.co.il</a></p>
	</div>
</body>
</html>