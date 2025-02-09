// Month names for display
const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

// Get today's date
const today = new Date();
let currentMonth = today.getMonth(); // Current month (0-11)
let currentYear = today.getFullYear(); // Current year

// Select DOM elements
const calendar = document.getElementById("calendar");
const monthYearLabel = document.getElementById("monthYear");
const itemsMorning = document.getElementById("items");
const itemsAfternoon = document.getElementById("itemsAfternoon");
const itemsEvening = document.getElementById("itemsEvening");

// Sample items for morning, afternoon, and evening
const morningActivities = [
    "Personal Hygiene", "Exercise", "Breakfast", "Plan the Day", "Start Work/Study"
];
const afternoonActivities = [
    "Lunch", "Work or Study", "Short Breaks", "Socialize", "Appointments"
];
const eveningActivities = [
    "Dinner", "Relaxation", "Personal Time", "Prepare for Tomorrow", "Bedtime Routine"
];

// Function to render the calendar
function renderCalendar(month, year) {
    monthYearLabel.textContent = `${monthNames[month]} ${year}`;

    calendar.innerHTML = ""; // Clear the previous calendar content

    const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();
    const startDay = new Date(year, month, 1).getDay();

    for (let i = 0; i < startDay; i++) {
        const emptyCell = document.createElement("div");
        calendar.appendChild(emptyCell);
    }

    for (let day = 1; day <= daysInCurrentMonth; day++) {
        const dayCell = document.createElement("div");
        if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
            dayCell.classList.add("today");
        }
        dayCell.textContent = day;
        calendar.appendChild(dayCell);
    }
}

// Function to render draggable items
function renderItems(container, activities) {
    container.innerHTML = "";
    activities.forEach(activity => {
        const itemDiv = createDraggableItem(activity);
        container.appendChild(itemDiv);
    });
}

// Function to create a draggable item
function createDraggableItem(name) {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("item");
    itemDiv.draggable = true;

    const nameParagraph = document.createElement("p");
    nameParagraph.classList.add("names", "caption");
    nameParagraph.textContent = name;

    const closeIcon = document.createElement("img");
    closeIcon.src = "./img/cancel_24dp_5F6368_FILL1_wght400_GRAD0_opsz24.svg";
    closeIcon.alt = "Close";
    closeIcon.classList.add("icon");

    closeIcon.addEventListener("click", () => {
        if (itemDiv.parentElement.classList.contains("urTime")) {
            itemDiv.parentElement.innerHTML = ""; // Clear `urTime`
        } else {
            container.removeChild(itemDiv);
        }
    });

    itemDiv.appendChild(nameParagraph);
    itemDiv.appendChild(closeIcon);

    // Drag events for desktop
    itemDiv.addEventListener("dragstart", (e) => e.dataTransfer.setData("text/plain", name));

    // Touch events for mobile
    itemDiv.addEventListener("touchstart", (e) => {
        e.target.dataset.dragging = name;
    });

    itemDiv.addEventListener("touchend", (e) => {
        const targetElement = document.elementFromPoint(
            e.changedTouches[0].clientX,
            e.changedTouches[0].clientY
        );

        if (targetElement && targetElement.classList.contains("urTime") && targetElement.children.length === 0) {
            const droppedItem = createDraggableItem(e.target.dataset.dragging);
            targetElement.appendChild(droppedItem);
        }

        delete e.target.dataset.dragging;
    });

    return itemDiv;
}

// Drag-and-drop logic for all `urTime` containers
document.querySelectorAll(".urTime").forEach(urTime => {
    urTime.addEventListener("dragover", (e) => e.preventDefault());

    urTime.addEventListener("drop", (e) => {
        e.preventDefault();
        if (urTime.children.length > 0) return;

        const name = e.dataTransfer.getData("text/plain");
        const droppedItem = createDraggableItem(name);
        urTime.appendChild(droppedItem);
    });
});

// Navigation functions
function prevMonth() {
    if (currentMonth === 0) {
        currentMonth = 11;
        currentYear--;
    } else {
        currentMonth--;
    }
    renderCalendar(currentMonth, currentYear);
}

function nextMonth() {
    if (currentMonth === 11) {
        currentMonth = 0;
        currentYear++;
    } else {
        currentMonth++;
    }
    renderCalendar(currentMonth, currentYear);
}

// Initialize calendar and items
renderCalendar(currentMonth, currentYear);
renderItems(itemsMorning, morningActivities);
renderItems(itemsAfternoon, afternoonActivities);
renderItems(itemsEvening, eveningActivities);
