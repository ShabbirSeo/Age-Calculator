window.onload = function() {
    // Set the default value of the "Age at the Date of" input to today's date
    document.getElementById('age-at-date').valueAsDate = new Date();
};

function calculateAge() {
    const dob = document.getElementById('dob').value;
    const ageAtDate = document.getElementById('age-at-date').value;

    if (!dob || !ageAtDate) {
        alert('Please enter both dates');
        return;
    }

    const dobDate = new Date(dob);
    const targetDate = new Date(ageAtDate);
    
    if (targetDate < dobDate) {
        alert('Age at the Date must be after Date of Birth');
        return;
    }

    const diff = targetDate - dobDate;
    const ageDate = new Date(diff);

    const years = ageDate.getUTCFullYear() - 1970;
    const months = ageDate.getUTCMonth();
    const days = ageDate.getUTCDate() - 1;
    const weeks = Math.floor(diff / (1000 * 60 * 60 * 24 * 7));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));
    const seconds = Math.floor(diff / 1000);

    const totalMonths = (years * 12) + months;
    const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));

    document.getElementById('result').innerHTML = `
        <p>Age: ${years} years ${months} months ${days} days</p>
        <p>or ${totalMonths} months ${days} days</p>
        <p>or ${weeks} weeks ${days} days</p>
        <p>or ${totalDays} days</p>
        <p>or ${hours.toLocaleString()} hours</p>
        <p>or ${minutes.toLocaleString()} minutes</p>
        <p>or ${seconds.toLocaleString()} seconds</p>
    `;

    // Display calendars
    displayCalendar(dobDate, 'dob-calendar', dobDate);
    displayCalendar(targetDate, 'age-calendar', targetDate);
}

function displayCalendar(date, elementId, highlightDate) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    const calendar = document.getElementById(elementId);
    const highlightDay = highlightDate.getDate();

    let html = `<h3>${date.toLocaleString('default', { month: 'long' })} ${year}</h3>`;
    html += '<table>';
    html += '<tr><th>S</th><th>M</th><th>T</th><th>W</th><th>T</th><th>F</th><th>S</th></tr><tr>';

    for (let i = 0; i < firstDay; i++) {
        html += '<td></td>';
    }

    for (let day = 1; day <= lastDate; day++) {
        if ((firstDay + day - 1) % 7 === 0) {
            html += '</tr><tr>';
        }
        if (day === highlightDay) {
            html += `<td class="highlight">${day}</td>`;
        } else {
            html += `<td>${day}</td>`;
        }
    }

    html += '</tr></table>';
    calendar.innerHTML = html;
}
