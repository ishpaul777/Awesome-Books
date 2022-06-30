import { DateTime } from './luxon.js';

setInterval(() => {
  const now = DateTime.now();
  const time = document.querySelector('.time');

  time.textContent = now.toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS);
}, 1);
