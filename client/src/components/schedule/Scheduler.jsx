// Libraries
import React from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'

import './Scheduler.scss' // webpack must be configured to do this

export default function Scheduler() {
  return <div>
      <FullCalendar
          defaultView="timeGridDay"
          plugins={[ dayGridPlugin, timeGridPlugin ]}
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
