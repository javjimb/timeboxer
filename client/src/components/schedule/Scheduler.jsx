// Libraries
import React from 'react';

// Fullcalendar
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction';

import './Scheduler.scss' // webpack must be configured to do this

export default function Scheduler({updateTask}) {

    const update = (calendarEvent) => {
        console.log(calendarEvent);
        console.log(calendarEvent.date);
        console.log(calendarEvent.draggedEl.attributes.name.value);
        console.log(calendarEvent.draggedEl.attributes.id.value);
        console.log(calendarEvent.draggedEl.attributes.duration.value);
        //calendarEvent.draggedEl.parentNode.removeChild(calendarEvent.draggedEl);
    }

  return <div>
      <FullCalendar
          defaultView="timeGridDay"
          plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
          droppable={true}
          drop={(event) => update(event)}
          header={{
              //left: 'prev,next today',
              left: '',
              center: 'title',
              right: ''
              //right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
          }}
      />
  </div>;
}
