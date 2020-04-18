// Libraries
import React, {useEffect, useState} from 'react';
import moment from "moment";

// Fullcalendar
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction';

import './Scheduler.scss' // webpack must be configured to do this

export default function Scheduler({
  taskList,
  updateTask
}) {

    const [eventList, setEventList] = useState([]);

    useEffect(() => {

        function convertTasksToSchedulerEvents() {
            let events = [];
            taskList.forEach( task => {
                if (task.start > 0 && task.end > 0) {
                    events.push({
                        title: task.name,
                        id: task._id,
                        start: moment.unix(task.start).toDate(),
                        end: moment.unix(task.end).toDate()
                    });
                }
            })

            setEventList(events);
        }

        convertTasksToSchedulerEvents();

    }, [taskList]);

    const calendarRef = React.createRef()

    const receive = (event) => {

        let duration = event.draggedEl.attributes.duration.value;
        // extract the id from the dragged event
        let id = event.draggedEl.attributes.id.value;
        // get the event drawn in the calendar
        let calendarApi = calendarRef.current.getApi()
        let calEvent = calendarApi.getEventById(id);
        // use the duration and start date to create the end date
        let startTimestamp = moment(calEvent.start).unix();
        let endTimestamp = startTimestamp + (duration * 3600);
        let end = moment.unix(endTimestamp).toDate();
        // set the end date of the calendar event
        calEvent.setEnd(end);

        // update the task's start and end date
        updateTask(id, {
            start: startTimestamp,
            end: endTimestamp
        });

        //calendarEvent.draggedEl.parentNode.removeChild(calendarEvent.draggedEl);
    }

  return <div>
      <FullCalendar
          ref={calendarRef}
          defaultView="timeGridDay"
          plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
          droppable={true}
          editable={true}
          events={eventList}
          eventReceive={(event) => receive(event)}
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
