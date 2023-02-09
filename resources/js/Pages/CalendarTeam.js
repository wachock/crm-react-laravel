import React from 'react'
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from '@fullcalendar/timegrid';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid'

export default function CalendarTeam() {
    
  return (
    <FullCalendar
        plugins={[timeGridPlugin]}
        resources = {[
            { id: 'a', title: 'Room A' },
            { id: 'b', title: 'Room B'},
            { id: 'c', title: 'Room C' },
            { id: 'd', title: 'Room D' }
        ]}
        events={'https://fullcalendar.io/api/demo-feeds/events.json?with-resources=4&single-day'}
    />
  )
}
