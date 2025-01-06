document.addEventListener("DOMContentLoaded", () => {
    const itemsContainer = document.getElementById("items");
    const urTimeDivs = document.querySelectorAll(".urTime");
  
    // Populate itemsContainer with sample tasks
    const tasks = ["Task 1", "Task 2", "Task 3"];
    tasks.forEach((task, index) => {
      const item = document.createElement("div");
      item.classList.add("task");
      item.setAttribute("draggable", true);
      item.innerHTML = `
        ${task}
        <span class="close-btn" data-id="${index}">&times;</span>
      `;
      itemsContainer.appendChild(item);
    });
  
    // Enable dragging for tasks
    itemsContainer.addEventListener("dragstart", (event) => {
      if (event.target.classList.contains("task")) {
        event.dataTransfer.setData("text", event.target.outerHTML);
      }
    });
  
    // Enable dropping into urTime divs
    urTimeDivs.forEach((urTime) => {
      urTime.addEventListener("dragover", (event) => {
        event.preventDefault();
      });
  
      urTime.addEventListener("drop", (event) => {
        event.preventDefault();
        // Allow only one item per urTime div
        if (urTime.children.length === 0) {
          const taskHTML = event.dataTransfer.getData("text");
          urTime.innerHTML = taskHTML;
  
          // Add functionality to the close button of the dropped task
          const closeBtn = urTime.querySelector(".close-btn");
          closeBtn.addEventListener("click", () => {
            urTime.innerHTML = ""; // Remove the task from urTime
          });
        }
      });
    });
  
    // Remove items from itemsContainer when "close" button is clicked
    itemsContainer.addEventListener("click", (event) => {
      if (event.target.classList.contains("close-btn")) {
        const task = event.target.closest(".task");
        task.remove();
      }
    });
  });
  