import React from 'react';
import s from './Titlebar.module.scss';

function Titlebar() {
  return (
    <div className={s.titlebar}>
      <span id="title" className={s.title}>
        Mon titre
      </span>
    </div>
  );
}

export default Titlebar;