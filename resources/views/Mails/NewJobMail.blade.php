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
		<h1 style="text-align: center;">{{__('mail.worker_new_job.hi')}}, {{ $job['worker']['firstname'] }} {{ $job['worker']['lastname'] }}</h1>
		<p style="text-align: center;line-height: 30px">{{__('mail.worker_new_job.greetings')}} {{__('mail.worker_new_job.from')}} {{__('mail.worker_new_job.company')}}. {{__('mail.worker_new_job.content')}}</p>
		<table >
			  <tr>
			    <th>Job Dated</th>
			    <th>Client Name</th>
			    <th>Service Name</th>
			    <th>Shift</th>
			    <th>Status</th>
			    <th>Action</th>
			  </tr>
			  <tr>
			    <td>{{ \Carbon\Carbon::parse($job['start_date'])->format('M d Y') }}</td>
			    <td>{{ $job['client']['firstname'] }} {{ $job['client']['lastname'] }}</td>
			    <td>{{ $job['jobservice']['name'] }} </td>
			    <td>{{ $job['start_time'] }} to {{ $job['end_time'] }} </td>
			    <td>{{ ucfirst($job['status']) }} </td>
			    <td><a href='{{ url("worker/view-job/".$job["id"] ) }}'>View Job</a></td>
			  </tr>
			</table>
		<p style="margin-top: 40px">{{__('mail.worker_new_job.reply_txt')}}</p>
		<p style="font-weight: 700;margin-bottom: 0;">{{__('mail.worker_new_job.regards')}}</p>
		<p style="margin-top: 3px;font-size: 14px;margin-bottom: 3px;">{{__('mail.worker_new_job.company')}}</p>
		<p style="margin-top: 3px;font-size: 14px;margin-bottom: 3px">{{__('mail.worker_new_job.tel')}}: 03-525-70-60</p>
		<p style="margin-top: 3px;font-size: 14px;margin-bottom: 3px"><a href="mailto:office@broomservice.co.il">office@broomservice.co.il</a></p>
	</div>
</body>
</html>