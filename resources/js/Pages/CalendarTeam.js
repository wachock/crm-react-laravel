import React from 'react'
import { Calendar } from '@fullcalendar/core';

export default function CalendarTeam() {
    let calendar = new Calendar(calendarEl, {
        timeZone: 'UTC',
        initialView: 'resourceTimeGridDay',
        resources: [
        { id: 'a', title: 'Room A' },
        { id: 'b', title: 'Room B'},
        { id: 'c', title: 'Room C' },
        { id: 'd', title: 'Room D' }
        ],
        events: 'https://fullcalendar.io/api/demo-feeds/events.json?with-resources=4&single-day'
      });
      calendar.render();
  return (
    <div id='calendar'></div>
  )
}
