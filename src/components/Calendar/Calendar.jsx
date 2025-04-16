import React from 'react';
import s from './Calendar.module.scss';

function Calendar() {
  return (
    <div className={s.calendar}>
      <h2 className={s.title}>Calendrier</h2>
      <p className={s.description}>Ceci est un composant de calendrier.</p>
    </div>
  );
}

export default Calendar;