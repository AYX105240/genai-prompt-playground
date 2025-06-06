import React, { useState } from 'react';
import ScheduleCreate from './ScheduleCreate';
import ScheduleCalendar from './ScheduleCalendar';

export default function Schedules() {
  const [activeTab, setActiveTab] = useState('create');

  return (
    <div className="container mt-4">
      <h2>Schedules</h2>
      <ul className="nav nav-tabs mb-3">
        <li className="nav-item">
          <button
            className={`nav-link${activeTab === 'create' ? ' active' : ''}`}
            onClick={() => setActiveTab('create')}
            type="button"
            style={{ border: 0, background: 'none', cursor: 'pointer' }}
          >
            Create Schedule
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link${activeTab === 'calendar' ? ' active' : ''}`}
            onClick={() => setActiveTab('calendar')}
            type="button"
            style={{ border: 0, background: 'none', cursor: 'pointer' }}
          >
            Schedule Calendar
          </button>
        </li>
      </ul>
      <div>
        {activeTab === 'create' && <ScheduleCreate />}
        {activeTab === 'calendar' && <ScheduleCalendar />}
      </div>
    </div>
  );
}
