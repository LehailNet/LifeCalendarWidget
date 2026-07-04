const BIRTH_DATE = new Date(1998, 7, 10); // August 10, 1998
const LIFE_EXPECTANCY = 90; // years
const WEEKS_PER_YEAR = 52;
const TOTAL_WEEKS = LIFE_EXPECTANCY * WEEKS_PER_YEAR;

/**
 * Calculate the number of days between two dates
 */
const daysBetween = (date1, date2) => {
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    return Math.floor((date2 - date1) / millisecondsPerDay);
};

/**
 * Get the current date
 */
const getCurrentDate = () => new Date();

/**
 * Calculate current age in years
 */
const calculateAge = () => {
    const today = getCurrentDate();
    let age = today.getFullYear() - BIRTH_DATE.getFullYear();
    const monthDiff = today.getMonth() - BIRTH_DATE.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < BIRTH_DATE.getDate())) {
        age--;
    }

    return age;
};

/**
 * Calculate the number of weeks lived
 */
const calculateWeeksLived = () => {
    const today = getCurrentDate();
    const daysPassed = daysBetween(BIRTH_DATE, today);
    return Math.floor(daysPassed / 7);
};

/**
 * Calculate the number of weeks remaining
 */
const calculateWeeksRemaining = () => {
    const weeksLived = calculateWeeksLived();
    return TOTAL_WEEKS - weeksLived;
};

/**
 * Calculate life progress percentage
 */
const calculateLifeProgress = () => {
    const weeksLived = calculateWeeksLived();
    return ((weeksLived / TOTAL_WEEKS) * 100).toFixed(1);
};

/**
 * Calculate days until next birthday
 */
const calculateDaysToBirthday = () => {
    const today = getCurrentDate();
    let nextBirthday = new Date(today.getFullYear(), BIRTH_DATE.getMonth(), BIRTH_DATE.getDate());

    // If birthday has already passed this year, calculate for next year
    if (today > nextBirthday) {
        nextBirthday = new Date(today.getFullYear() + 1, BIRTH_DATE.getMonth(), BIRTH_DATE.getDate());
    }

    return daysBetween(today, nextBirthday);
};

/**
 * Get the current week number (1-52) and year number (1-90)
 */
const getCurrentWeekInfo = () => {
    const weeksLived = calculateWeeksLived();
    const yearNumber = Math.floor(weeksLived / WEEKS_PER_YEAR) + 1;
    const weekInYear = (weeksLived % WEEKS_PER_YEAR) + 1;

    return {
        weekNumber: weeksLived + 1,
        yearNumber,
        weekInYear
    };
};

/**
 * Format a date as a string
 */
const formatDate = (date) => {
    const options = { month: 'short', day: '2-digit', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
};

/**
 * Get the start and end date of a given week number
 */
const getWeekDateRange = (weekNumber) => {
    const weekStart = new Date(BIRTH_DATE);
    weekStart.setDate(weekStart.getDate() + (weekNumber - 1) * 7);

    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);

    return {
        start: weekStart,
        end: weekEnd
    };
};

/**
 * Calculate the age at a specific week
 */
const getAgeAtWeek = (weekNumber) => {
    const { start } = getWeekDateRange(weekNumber);
    const daysPassed = daysBetween(BIRTH_DATE, start);
    return Math.floor(daysPassed / 365.25);
};

/**
 * Update all statistics on the page
 */
const updateStatistics = () => {
    const age = calculateAge();
    const weeksLived = calculateWeeksLived();
    const weeksRemaining = calculateWeeksRemaining();
    const lifeProgress = calculateLifeProgress();
    const daysToBirthday = calculateDaysToBirthday();

    document.getElementById('age').textContent = `${age} years`;
    document.getElementById('weeksLived').textContent = weeksLived.toLocaleString();
    document.getElementById('weeksRemaining').textContent = weeksRemaining.toLocaleString();
    document.getElementById('lifeProgress').textContent = `${lifeProgress}%`;
    document.getElementById('daysToBirthday').textContent = `${daysToBirthday} days`;
};

/**
 * Create a week square element
 */
const createWeekSquare = (weekNumber) => {
    const square = document.createElement('div');
    square.className = 'week';
    square.setAttribute('aria-label', `Week ${weekNumber}`);
    square.setAttribute('tabindex', '0');

    const weeksLived = calculateWeeksLived();

    // Determine the state of the week
    if (weekNumber <= weeksLived) {
        square.classList.add('past');
    } else if (weekNumber === weeksLived + 1) {
        square.classList.add('current');
    } else {
        square.classList.add('future');
    }

    // Add event listeners for tooltip
    square.addEventListener('mouseenter', (e) => showTooltip(e, weekNumber));
    square.addEventListener('mousemove', (e) => moveTooltip(e));
    square.addEventListener('mouseleave', hideTooltip);

    // Keyboard navigation for tooltip
    square.addEventListener('focus', (e) => showTooltip(e, weekNumber));
    square.addEventListener('blur', hideTooltip);

    return square;
};

/**
 * Generate the life grid
 */
const generateLifeGrid = () => {
    const gridContainer = document.getElementById('lifeGrid');
    gridContainer.innerHTML = '';

    for (let week = 1; week <= TOTAL_WEEKS; week++) {
        const square = createWeekSquare(week);
        gridContainer.appendChild(square);
    }
};

/**
 * Show tooltip for a week
 */
const showTooltip = (event, weekNumber) => {
    const tooltip = document.getElementById('tooltip');
    const { start, end } = getWeekDateRange(weekNumber);
    const ageAtWeek = getAgeAtWeek(weekNumber);

    const tooltipContent = `
        <strong>Week #${weekNumber}</strong>
        <div>${formatDate(start)}</div>
        <div>↓</div>
        <div>${formatDate(end)}</div>
        <div style="margin-top: 0.5rem; border-top: 1px solid currentColor; padding-top: 0.5rem;">Age: ${ageAtWeek} years</div>
    `;

    tooltip.innerHTML = tooltipContent;
    tooltip.classList.add('visible');
    moveTooltip(event);
};

/**
 * Move tooltip with cursor
 */
const moveTooltip = (event) => {
    const tooltip = document.getElementById('tooltip');
    const offsetX = 12;
    const offsetY = 12;

    tooltip.style.left = (event.clientX + offsetX) + 'px';
    tooltip.style.top = (event.clientY + offsetY) + 'px';
};

/**
 * Hide tooltip
 */
const hideTooltip = () => {
    const tooltip = document.getElementById('tooltip');
    tooltip.classList.remove('visible');
};

/**
 * Animate the progress bar on page load
 */
const animateProgressBar = () => {
    const lifeProgress = calculateLifeProgress();
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');

    // Trigger animation
    setTimeout(() => {
        progressBar.style.width = lifeProgress + '%';
        progressText.textContent = lifeProgress + '%';
    }, 100);
};

/**
 * Initialize the page
 */
const init = () => {
    updateStatistics();
    generateLifeGrid();
    animateProgressBar();
};

// Initialize when the page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Update statistics and grid when the date changes (every minute)
setInterval(() => {
    updateStatistics();
    generateLifeGrid();
}, 60000); // Update every minute
