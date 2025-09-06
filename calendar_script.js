let currentDate = new Date();

function renderCalendar(date, elementId) {
  const month = date.getMonth();
  const year = date.getFullYear();

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  let html = `<h2>${date.toLocaleString("default", { month: "long" })} ${year}</h2>`;
  html += `<div class="calendar-grid">`;

  // Day names
  const dayNames = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  dayNames.forEach(d => {
    html += `<div class="day-name">${d}</div>`;
  });

  // Empty slots
  for (let i = 0; i < firstDay; i++) {
    html += `<div></div>`;
  }

  // Days
  for (let day = 1; day <= lastDate; day++) {
    const today = new Date();
    const isToday = day === today.getDate() &&
                    month === today.getMonth() &&
                    year === today.getFullYear();
    html += `<div class="day ${isToday ? "today" : ""}">${day}</div>`;
  }

  html += `</div>`;
  document.getElementById(elementId).innerHTML = html;
}

function updateCalendars() {
  renderCalendar(currentDate, "current");
  renderCalendar(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1), "prev");
  renderCalendar(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1), "next");
}

function prevMonth() {
  currentDate.setMonth(currentDate.getMonth() - 1);
  updateCalendars();
}

function nextMonth() {
  currentDate.setMonth(currentDate.getMonth() + 1);
  updateCalendars();
}

// Initial load
updateCalendars();
