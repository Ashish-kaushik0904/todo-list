const API = "http://localhost:5000/tasks";

async function fetchTasks() {
    const res = await fetch(API);
    const tasks = await res.json();

    const list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span class="${task.completed ? "completed" : ""}">
                ${task.title}
            </span>
            <div>
                <button onclick="toggleTask('${task._id}', ${task.completed})">✔</button>
                <button onclick="deleteTask('${task._id}')">❌</button>
            </div>
        `;
        list.appendChild(li);
    });
}

async function addTask() {
    const input = document.getElementById("taskInput");
    const title = input.value;

    if (!title) return;

    await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title })
    });

    input.value = "";
    fetchTasks();
}

async function toggleTask(id, completed) {
    await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !completed })
    });

    fetchTasks();
}

async function deleteTask(id) {
    await fetch(`${API}/${id}`, {
        method: "DELETE"
    });

    fetchTasks();
}

fetchTasks();
