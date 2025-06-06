import React, { useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import rrulePlugin from '@fullcalendar/rrule';
import '@fullcalendar/common/main.css';

// Dummy events for demonstration
const demoEvents = [
  {
    id: '1',
    title: 'Team Meeting',
    start: '2025-06-10T10:00:00',
    end: '2025-06-10T11:00:00',
    description: 'Weekly sync-up',
  },
  {
    id: '2',
    title: 'Project Deadline',
    start: '2025-06-15T09:00:00',
    end: '2025-06-15T10:00:00',
    description: 'Submit final report',
  },
  {
    id: '3',
    title: 'Doctor Appointment',
    start: '2025-06-12T15:00:00',
    end: '2025-06-12T16:00:00',
    description: 'Annual checkup',
  },
  {
    id: '4',
    title: 'Weekly Standup',
    description: 'Occurs every Monday',
    rrule: {
      freq: 'weekly',
      byweekday: 'mo',
      dtstart: '2025-06-02T09:00:00',
      until: '2025-07-31T23:59:59',
    },
    duration: '01:00',
  },
];

export default function ScheduleCalendar() {
  const calendarRef = useRef();
  const [selectedEvent, setSelectedEvent] = useState(null);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-8">
          <div className="card mb-4">
            <div className="card-header fw-bold">Calendar (with Recurring Events)</div>
            <div className="card-body p-2">
              <FullCalendar
                ref={calendarRef}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, rrulePlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                  left: 'prev,next today',
                  center: 'title',
                  right: 'dayGridMonth,timeGridWeek,timeGridDay',
                }}
                events={demoEvents}
                eventClick={info => setSelectedEvent(info.event)}
                height={500}
                selectable={true}
                eventContent={renderEventContent}
              />
              {/* Show details for selected event below calendar */}
              {selectedEvent && (
                <div className="mt-3">
                  <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center">
                      <span>Event: {selectedEvent.title}</span>
                      <button className="btn btn-sm btn-link" onClick={() => setSelectedEvent(null)}>&times;</button>
                    </div>
                    <div className="card-body">
                      <div><b>Start:</b> {selectedEvent.start?.toLocaleString()}</div>
                      <div><b>End:</b> {selectedEvent.end?.toLocaleString()}</div>
                      <div><b>Description:</b> {selectedEvent.extendedProps?.description}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-header fw-bold">All Events</div>
            <ul className="list-group list-group-flush">
              {demoEvents.length === 0 && (
                <li className="list-group-item text-muted">No events.</li>
              )}
              {demoEvents.map(ev => (
                <li key={ev.id} className="list-group-item">
                  <div className="fw-semibold">{ev.title}</div>
                  <div className="small text-muted">
                    {ev.start ? new Date(ev.start).toLocaleDateString() : ''} {ev.start ? new Date(ev.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                  </div>
                  <div>{ev.description || ev.desc}</div>
                  {ev.rrule && <div className="badge bg-info text-dark mt-1">Recurring</div>}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b> <span>{eventInfo.event.title}</span>
      {eventInfo.event.extendedProps?.description && (
        <div style={{ fontSize: '0.85em', color: '#555' }}>{eventInfo.event.extendedProps.description}</div>
      )}
      {eventInfo.event._def.recurringDef && (
        <span className="badge bg-info text-dark ms-1">Recurring</span>
      )}
    </>
  );
}
