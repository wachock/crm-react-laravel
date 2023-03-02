<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
	<title>Job Status</title>
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
		<h1 style="text-align: center;">{{__('mail.job_status.hi')}}, {{$admin['name']}} </h1>
		<p style="text-align: center;line-height: 30px"> {{__('mail.job_status.content')}} {{ ucfirst($job['status']) }}. 
		@if($job['status'] != 'completed') 
		{{__('mail.job_status.reason')}} {{ $comment }}.
		@endif
	   </p>
		
         <table >
			  <tr>
			    <th>Job Dated</th>
			    <th>Worker Name</th>
			    <th>Client Name</th>
			    <th>Service Name</th>
			    <th>Shift</th>
			    <th>Status</th>
			    <th>Action</th>
			  </tr>
			  <tr>
			    <td>{{ \Carbon\Carbon::parse($job['start_date'])->format('M d Y') }}</td>
			    <td>{{ $job['worker']['firstname'] }} {{ $job['worker']['lastname'] }}</td>
			    <td>{{ $job['client']['firstname'] }} {{ $job['client']['lastname'] }}</td>
			    <td>{{ $job['jobservice']['name'] }} </td>
			    <td>{{ $job['start_time'] }} to {{ $job['end_time'] }} </td>
			    <td>{{ ucfirst($job['status']) }} </td>
			    <td><a href='{{ url("admin/edit-job/".$job["id"] ) }}'>Edit Job</a> <a href='{{ url("admin/view-job/".$job["id"] ) }}'>View Job</a></td>
			  </tr>
			</table>        

		<p style="margin-top: 3px;font-size: 14px;margin-bottom: 3px;">{{__('mail.job_status.thanks_text')}}</p>
		</p>
	</div>
</body>
</html>