import React from 'react'
import Sidebar from '../../Layouts/Sidebar'
import { Calendar } from '@fullcalendar/core';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!

export default function Schedule() {
    document.addEventListener('DOMContentLoaded', function() {
        let draggableEl = document.getElementById('mydraggable');
        let calendarEl = document.getElementById('mycalendar');
      
        let calendar = new Calendar(calendarEl, {
          plugins: [ interactionPlugin ],
          droppable: true
        });
      
        calendar.render();
      
        new Draggable(draggableEl);
      });
  return (
    <div id="container">
        <Sidebar/>
        <div id="content">
            <h1 className="page-title">Schedule</h1>
            <div className='dashBox'>
            <FullCalendar
                plugins={[ dayGridPlugin ]}
                initialView="dayGridMonth"
            />
            </div>
        </div>
    </div>
  )
}
