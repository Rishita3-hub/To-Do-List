// ✅ Toggle checkbox tick and replace with new task
const checkboxes = document.querySelectorAll(".todo-checkbox");

checkboxes.forEach(box => {
  box.addEventListener("click", () => {
    box.classList.toggle("checked");

    if (box.classList.contains("checked")) {
      const currentLi = box.parentElement;
      const dropdown = currentLi.nextElementSibling;

      // Hide current task and its dropdown
      currentLi.style.display = "none";
      if (dropdown && dropdown.classList.contains("dropdown-detail")) {
        dropdown.style.display = "none";
      }

      // Create new task + dropdown
      const newTask = document.createElement("li");
      newTask.className = "todo-item";
      newTask.innerHTML = `
        <div class="todo-checkbox"></div>
            <input type="text" class="task-input" placeholder="" />
            <img src="images/quill-pen.png" class="detail-toggle" alt="Details" />
          `;

      const newDropdown = document.createElement("div");
      newDropdown.className = "dropdown-detail";
      newDropdown.style.display = "none";
      newDropdown.innerHTML = `<textarea placeholder="Write more about this task..."></textarea>`;

      const todoList = document.getElementById("todo-list");
      todoList.appendChild(newTask);
      todoList.appendChild(newDropdown);

      // ✅ Attach event listeners to new elements
      attachCheckboxEvent(newTask.querySelector(".todo-checkbox"));
      attachToggleEvent(newTask.querySelector(".detail-toggle"));
    }
  });
});

// ✅ Dropdown toggle event for pen icon
function attachToggleEvent(icon) {
  icon.addEventListener("click", function (e) {
    e.stopPropagation();
    document.querySelectorAll(".dropdown-detail").forEach(drop => {
      if (drop !== this.parentElement.nextElementSibling) {
        drop.style.display = "none";
      }
    });

    const detail = this.parentElement.nextElementSibling;
    if (detail && detail.classList.contains("dropdown-detail")) {
      detail.style.display = detail.style.display === "block" ? "none" : "block";
    }
  });
}

// ✅ Checkbox event logic (for new ones too)
function attachCheckboxEvent(box) {
  box.addEventListener("click", () => {
    box.classList.toggle("checked");

    if (box.classList.contains("checked")) {
      const currentLi = box.parentElement;
      const dropdown = currentLi.nextElementSibling;

      currentLi.style.display = "none";
      if (dropdown && dropdown.classList.contains("dropdown-detail")) {
        dropdown.style.display = "none";
      }

      const newTask = document.createElement("li");
      newTask.className = "todo-item";
      newTask.innerHTML = `
        <div class="todo-checkbox"></div>
        <input type="text" class="task-input" placeholder="New Task" />
        <img src="images/pen.png" class="detail-toggle" alt="Details" />
      `;

      const newDropdown = document.createElement("div");
      newDropdown.className = "dropdown-detail";
      newDropdown.style.display = "none";
      newDropdown.innerHTML = `<textarea placeholder="Write more about this task..."></textarea>`;

      const todoList = document.getElementById("todo-list");
      todoList.appendChild(newTask);
      todoList.appendChild(newDropdown);

      attachCheckboxEvent(newTask.querySelector(".todo-checkbox"));
      attachToggleEvent(newTask.querySelector(".detail-toggle"));
    }
  });
}

// ✅ Initial binding
document.querySelectorAll(".detail-toggle").forEach(attachToggleEvent);

// ✅ Close dropdown on outside click
document.addEventListener("click", () => {
  document.querySelectorAll(".dropdown-detail").forEach(drop => {
    drop.style.display = "none";
  });
});

// ✅ Prevent dropdown closing when clicked inside
document.querySelectorAll(".dropdown-detail").forEach(drop => {
  drop.addEventListener("click", e => {
    e.stopPropagation();
  });
});
