import React from 'react'
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from '@fullcalendar/timegrid';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid'

export default function CalendarTeam() {
    
  return (
    <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, resourceTimeGridPlugin ]}
        initialView = 'resourceTimeGridDay'
        resources =  {[
            { id: 'a', title: 'Room A' },
            { id: 'b', title: 'Room B'},
            { id: 'c', title: 'Room C' },
            { id: 'd', title: 'Room D' },
            { id: 'e', title: 'Room E' },
            { id: 'f', title: 'Room F' },
            { id: 'g', title: 'Room G' },
            { id: 'H', title: 'Room H' },
            { id: 'I', title: 'Room I' }
        ]}
        
        events={'https://fullcalendar.io/api/demo-feeds/events.json?with-resources=4&single-day'}
    />
  )
}
