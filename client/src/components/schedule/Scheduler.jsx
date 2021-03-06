// Libraries
import React from 'react';
import moment from "moment";

// Fullcalendar
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction';

import './Scheduler.scss' // webpack must be configured to do this

const _ = require('lodash');

export default class Scheduler extends React.Component {
   constructor(props) {
       super(props);

       this.calendarRef = React.createRef();

       this.state = {
           taskList: this.props.taskList,
           eventList: [],
       };
   }
   componentDidMount() {
      this.convertTasksToSchedulerEvents();
   }

   componentDidUpdate(prevProps, prevState, snapshot) {
       // redraw the calendar events when the prop is updated
       if (!_.isEqual(this.props.taskList, prevProps.taskList)) {
           this.convertTasksToSchedulerEvents();
       }
   }

    /**
    * Go to next day in the scheduler
    */
   next() {
       this.calendarRef.current.getApi().next();
   }

   /**
    * Go to the previous day in the scheduler
    */
   previous() {
       this.calendarRef.current.getApi().prev();
   }

   /**
    * Go to today's date in the scheduler
    */
   today() {
       this.calendarRef.current.getApi().today();
   }

   /**
    * Formats tasks coming from the API into events compatible with fullcalendar
    */
   convertTasksToSchedulerEvents() {
       let events = [];
       this.props.taskList.forEach((task) => {
           if (task.status === 'scheduled' || task.status === 'completed') {
               events.push({
                   title: task.name,
                   id: task._id,
                   start: moment.unix(task.start).toDate(),
                   end: moment.unix(task.end).toDate(),
                   backgroundColor: task.status === 'scheduled' ? '#3788D8' : '#cacacc',
                   borderColor: task.status === 'scheduled' ? '#3788D8' : '#cacacc',
                   textColor: task.status === 'scheduled' ? 'white' : '#7d7e80',
               });
           }
       });

       this.setState({ eventList: events });
   }

   /**
    * Triggered when an external element is dropped inside the scheduler
    * @param event the object associated with the dropped element
    */
   eventReceive = (event) => {
       let duration = event.draggedEl.attributes.duration.value;
       // extract the id from the dragged event
       let id = event.draggedEl.attributes.id.value;
       // get the event drawn in the calendar
       let calendarApi = this.calendarRef.current.getApi();
       let calEvent = calendarApi.getEventById(id);
       // use the duration and start date to create the end date
       let startTimestamp = moment(calEvent.start).unix();
       let endTimestamp = startTimestamp + duration * 3600;
       let end = moment.unix(endTimestamp).toDate();
       // set the end date of the calendar event
       calEvent.setEnd(end);
       // delete the event because all events will get redrawn and will create a duplicate
       calEvent.remove();
       // update the task's start and end date
       this.props.updateTask(id, {
           start: startTimestamp,
           end: endTimestamp,
       });
       // update the task status
       this.props.updateTaskStatus(id, 'new', 'scheduled');

       this.convertTasksToSchedulerEvents();
   };

   /**
    * Triggered when an event within the scheduler is moved
    * @param data the calendar event data
    */
   eventDrop = (data) => {
       this.props.updateTask(data.event.id, {
           start: moment(data.event.start).unix(),
           end: moment(data.event.end).unix(),
       });
   };

   /**
    * Triggered when resizing stops and the event has changed in duration
    * @param data
    */
   eventResize = (data) => {
       this.props.updateTask(data.event.id, {
           start: moment(data.event.start).unix(),
           end: moment(data.event.end).unix(),
           duration:
               (moment(data.event.end).unix() -
                   moment(data.event.start).unix()) /
               3600,
       });
   };

   render() {
       return (
           <div>
               <FullCalendar
                   ref={this.calendarRef}
                   defaultView='timeGridDay'
                   plugins={[
                       dayGridPlugin,
                       timeGridPlugin,
                       interactionPlugin,
                   ]}
                   droppable={true}
                   editable={true}
                   slotDuration={'00:15:00'}
                   events={this.state.eventList}
                   eventReceive={this.eventReceive}
                   eventDrop={this.eventDrop}
                   eventResize={this.eventResize}
                   datesRender={this.props.onDateChange}
                   nowIndicator={true}
                   header={{
                       //left: 'prev,next today',
                       left: '',
                       center: 'title',
                       right: '',
                       //right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
                   }}
               />
           </div>
       );
   }
}
