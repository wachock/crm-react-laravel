import React, { useState, useEffect } from 'react'
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from '@fullcalendar/timegrid';
import { resourceTimeGridPlugin } from '@fullcalendar/resource-timegrid'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'
import interactionPlugin from '@fullcalendar/interaction';
import moment from 'moment-timezone';
import { useNavigate, useParams } from 'react-router-dom';
import { useAlert } from 'react-alert';


export default function CreateJobCalender() {
    const params = useParams();
    const navigate = useNavigate();
    const alert = useAlert();
    const [AllWorkers, setAllWorkers] = useState([]);
    const [AllJobs, setAllJobs] = useState([]);
    const [AllWorkerAvailability, setAllWorkerAvailability] = useState([]);
    const [startSlot, setStartSlot] = useState([]);
    const [endSlot, setEndSlot] = useState([]);
    const [interval, setInterval] = useState([]);

    const headers = {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: `Bearer ` + localStorage.getItem("admin-token"),
    };

    const [services, setServices] = useState([]);
    const [clientname, setClientName] = useState('');
    const getJob = () => {
        axios
            .get(`/api/admin/contract/${params.id}`, { headers })
            .then((res) => {
                const r = res.data.contract;
                setClientName(r.client.firstname + ' ' + r.client.lastname);
                setServices(JSON.parse(r.offer.services));
            });
    }
    useEffect(() => {
        getJob();
    }, []);
    let time_period;
    let service_id;
    {
        services && services.map((item, index) => {
            time_period = (item.jobHours);
            service_id = parseInt(item.service);
        })
    }

    const getWorkers = () => {
        axios
            .get(`/api/admin/all-workers?filter=true&contract_id=${params.id}`, { headers })
            .then((res) => {
                setAllWorkers(res.data.workers);
            })
    }
    const getJobs = () => {
        axios
            .get('/api/admin/get-all-jobs', { headers })
            .then((res) => {
                setAllJobs(res.data.jobs);
            })
    }
    const getWorkerAvailabilty = () => {
        axios
            .get('/api/admin/all-workers/availability', { headers })
            .then((res) => {
                setAllWorkerAvailability(res.data.availability);
            })
    }
    const getTime = () => {
        axios
            .get(`/api/admin/get-time`, { headers })
            .then((res) => {
                if (res.data.time.length > 0) {
                    setStartSlot(res.data.time[0].start_time);
                    setEndSlot(res.data.time[0].end_time);
                    let ar = JSON.parse(res.data.time[0].days);
                    let ai = [];
                    ar && ar.map((a, i) => (ai.push(parseInt(a))));
                    var hid = [0, 1, 2, 3, 4, 5, 6].filter(function (obj) { return ai.indexOf(obj) == -1; });
                    setInterval(hid);
                }
            })
    }
    useEffect(() => {
        getWorkers();
        getJobs();
        getWorkerAvailabilty();
        getTime();
    }, []);

    const resources = AllWorkers.map((w, i) => {
        return { id: w.id, title: (w.firstname + ' ' + w.lastname) };
    });
    const events = AllJobs.map((j, i) => {
        return {
            id: j.id,
            title: 'Busy',
            start: moment(j.start_date + ' ' + j.start_time).toISOString(),
            end: moment(j.start_date + ' ' + j.end_time).toISOString(),
            resourceId: j.worker_id,
            backgroundColor: '#ff0000',
            borderColor: '#ff0000',
        };
    });
    const events1 = AllWorkerAvailability.map((wa, i) => {
        return {
            id: wa.id,
            title: 'Available',
            start: moment(wa.date + ' ' + wa.start_time).toISOString(),
            end: moment(wa.date + ' ' + wa.end_time).toISOString(),
            resourceId: wa.worker_id,
            textColor: wa.worker_id + '_' + wa.name,
            backgroundColor: '#00FF00',
            borderColor: '#00FF00',
        };
    });
    Array.prototype.push.apply(events, events1);

    const [data, setData] = useState([]);

    const handleEventClick = (e) => {
        let str = e.startStr;
        var parts = str.slice(0, -9).split('T');
        var dateComponent = parts[0];
        var timeComponent = parts[1];
        var endtime = moment(parts[0] + ' ' + parts[1]).add(time_period, 'hours').format('HH:mm');

        const str1 = e.textColor;
        var parts1 = str1.split('_');

        if (data.length > 0) {
            let new_data = [];
            let found = true;
            data.map((d) => {
                if (d.worker_id == parts1[0] && d.date == dateComponent && d.start == timeComponent) {
                    found = false;
                } else {
                    new_data.push(d)
                }

            })

            if (found) {
                var newdata = [...data, {
                    worker_id: parts1[0],
                    worker_name: parts1[1],
                    date: dateComponent,
                    start: timeComponent,
                    end: endtime
                }]
            } else {
                var newdata = new_data;
            }

        } else {
            var newdata = [...data, {
                worker_id: parts1[0],
                worker_name: parts1[1],
                date: dateComponent,
                start: timeComponent,
                end: endtime
            }]
        }
        setData(newdata);
    }
    const handleSubmit = () => {

        let formdata = { 'workers': data };
        if (data.length > 0) {
            axios
                .post(`/api/admin/create-job/${params.id}`, formdata, { headers })
                .then((res) => {
                    alert.success(res.data.message)
                    setTimeout(() => {
                        navigate('/admin/jobs?q=scheduled');
                    }, 1000);

                });
        } else {
            alert("Please Select the Workers");
        }

    }


    return (
        <>
            <FullCalendar
                selectable={true}
                plugins={[dayGridPlugin, timeGridPlugin, resourceTimelinePlugin, interactionPlugin]}
                initialView='resourceTimelineWeek'
                resources={resources}
                height={'auto'} // sets height to height of resources.
                slotDuration={'00:30:00'}
                events={events}
                resourceAreaWidth={"15%"}
                slotMinTime={startSlot}
                slotMaxTime={endSlot}
                hiddenDays={interval}
                allDaySlot={false}
                eventClick={function (info) {
                    if (info.event.title == 'Busy') {
                        window.alert('Worker Not Available');
                    } else {
                        if (info.el.style.borderColor == 'red') {
                            info.el.style.borderColor = 'rgb(0 255 0)';
                        } else {
                            info.el.style.borderColor = 'red';
                        }
                        handleEventClick(info.event);
                    }
                }}
            />
            <div className="form-group text-center">
                <input type='button' value='View Job' className="btn btn-pink" data-toggle="modal" data-target="#exampleModal" />
            </div>
            <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">View Job</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">

                            <div className="row">
                                <div className="table-responsive">
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th scope="col">Client Name</th>
                                                <th scope="col">Services</th>
                                                <th scope="col">Frequency</th>
                                                <th scope="col">Complete Time</th>
                                            </tr>

                                        </thead>
                                        <tbody>
                                            <td>{clientname}</td>
                                            <td> {services &&
                                                services.map((item, index) => (

                                                    <p>{index + 1}.{item.name}</p>
                                                )
                                                )}</td>
                                            <td>{services &&
                                                services.map((item, index) => (

                                                    <p>{index + 1}.{item.freq_name}</p>
                                                )
                                                )}</td>
                                            <td>{services &&
                                                services.map((item, index) => (

                                                    <p>{item.jobHours} hours</p>
                                                )
                                                )}</td>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="table-responsive">
                                    {data.length > 0 ? (
                                        <table className="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Worker Name</th>
                                                    <th scope="col">Data</th>
                                                    <th scope="col">Start Time</th>
                                                    <th scope="col">End Time</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {data && data.map((d, i) =>
                                                (
                                                    <tr key={i}>
                                                        <td>
                                                            {d.worker_name}
                                                        </td>
                                                        <td>
                                                            {d.date}
                                                        </td>
                                                        <td>
                                                            {d.start}
                                                        </td>
                                                        <td>
                                                            {d.end}
                                                        </td>
                                                    </tr>
                                                )
                                                )}
                                            </tbody>
                                        </table>
                                    ) : ''}
                                </div>

                            </div>


                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary closeb" data-dismiss="modal">Close</button>
                            <button type="button" onClick={handleSubmit} className="btn btn-primary" data-dismiss="modal">Save and Send</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
