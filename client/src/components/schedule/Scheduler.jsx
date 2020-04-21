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
                if (task.status === 'scheduled') {
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

    /**
     * Triggered when an external element is dropped inside the scheduler
     * @param event the object associated with the dropped element
     */
    const eventReceive = (event) => {

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
            end: endTimestamp,
            status: 'scheduled'
        });

        //calendarEvent.draggedEl.parentNode.removeChild(calendarEvent.draggedEl);
    }

    /**
     * Triggered when an event within the scheduler is moved
     * @param data the calendar event data
     */
    const eventDrop = (data) => {
        updateTask(data.event.id, {
            start: moment(data.event.start).unix(),
            end: moment(data.event.end).unix()
        });
    }

    /**
     * Triggered when resizing stops and the event has changed in duration
     * @param data
     */
    const eventResize = (data) => {
        updateTask(data.event.id, {
            start: moment(data.event.start).unix(),
            end: moment(data.event.end).unix(),
            duration: (moment(data.event.end).unix() - moment(data.event.start).unix()) / 3600
        });
    }

  return <div>
      <FullCalendar
          ref={calendarRef}
          defaultView="timeGridDay"
          plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
          droppable={true}
          editable={true}
          slotDuration={'00:15:00'}
          events={eventList}
          eventReceive={eventReceive}
          eventDrop={eventDrop}
          eventResize={eventResize}
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
