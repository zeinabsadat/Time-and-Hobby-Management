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
  const animationDiv = document.getElementById("animation");
  const itemsContainer = document.getElementById("items"); // Container for items
  
  // Sample items to display (can be dynamically changed)
  const names = ["Ritual Activities", "Physical Exercise", 
    "Learning Time", "Work Sessions",
    "Meal Prep", "Meal Enjoyment",
    "Social Media", "Hobbies Time"];
  
  // Function to render the calendar
  function renderCalendar(month, year) {
    // Update the month and year label
    monthYearLabel.textContent = `${monthNames[month]} ${year}`;
  
    // Toggle animation visibility for January
    animationDiv.style.display = month === 0 ? "block" : "none";
  
    // Clear the previous calendar content
    calendar.innerHTML = "";
  
    // Calculate the days in the current month and the starting weekday
    const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();
    const startDay = new Date(year, month, 1).getDay();
  
    // Add empty cells for alignment
    for (let i = 0; i < startDay; i++) {
      const emptyCell = document.createElement("div");
      calendar.appendChild(emptyCell);
    }
  
    // Add days of the month
    for (let day = 1; day <= daysInCurrentMonth; day++) {
      const dayCell = document.createElement("div");
  
      // Highlight today's date
      if (
        day === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear()
      ) {
        dayCell.classList.add("today");
      }
  
      dayCell.textContent = day;
      calendar.appendChild(dayCell);
    }
  }
  
  // Function to render the items (names) with a close icon
  function renderItems(names) {
    itemsContainer.innerHTML = ""; // Clear existing items
  
    names.forEach(name => {
      const itemDiv = document.createElement("div");
      itemDiv.classList.add("item");
  
      // Add the name as a <p> element
      const nameParagraph = document.createElement("p");
      nameParagraph.classList.add("names", "subtitle2");
      nameParagraph.textContent = name;
  
      // Add the close icon as an <img> element
      const closeIcon = document.createElement("img");
      closeIcon.src = "./img/cancel_24dp_5F6368_FILL1_wght400_GRAD0_opsz24.svg";
      closeIcon.alt = "Close";
      closeIcon.classList.add("icon");
      closeIcon.addEventListener("click", () => removeItem(itemDiv)); // Remove item on click
  
      // Append the name and close icon to the item div
      itemDiv.appendChild(nameParagraph);
      itemDiv.appendChild(closeIcon);
  
      // Append the item div to the container
      itemsContainer.appendChild(itemDiv);
    });
  }
  
  // Function to remove an item
  function removeItem(itemDiv) {
    itemsContainer.removeChild(itemDiv);
  }
  
  // Function to navigate to the previous month
  function prevMonth() {
    if (currentMonth === 0) {
      currentMonth = 11; // December
      currentYear--; // Move to previous year
    } else {
      currentMonth--;
    }
    renderCalendar(currentMonth, currentYear);
  }
  
  // Function to navigate to the next month
  function nextMonth() {
    if (currentMonth === 11) {
      currentMonth = 0; // January
      currentYear++; // Move to next year
    } else {
      currentMonth++;
    }
    renderCalendar(currentMonth, currentYear);
  }
  
  // Initialize the calendar and items
  renderCalendar(currentMonth, currentYear);
  renderItems(names); // Render the items with close functionality
  