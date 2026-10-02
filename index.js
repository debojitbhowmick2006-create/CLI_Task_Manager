const fs = require("fs");

const FILE = "./tasks.json";

function loadTasks() {
  if (!fs.existsSync(FILE)) {
    return [];
  }

  return JSON.parse(fs.readFileSync(FILE, "utf8"));
}

function saveTasks(tasks) {
  fs.writeFileSync(FILE, JSON.stringify(tasks, null, 2));
}

const command = process.argv[2];
const argument = process.argv.slice(3).join(" ");

let tasks = loadTasks();

switch (command) {
  case "add": {
    if (!argument) {
      console.log("Please provide a task.");
      break;
    }

    const task = {
      id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
      title: argument,
      completed: false
    };

    tasks.push(task);
    saveTasks(tasks);

    console.log(`Added: ${task.title}`);
    break;
  }

  case "list": {
    if (tasks.length === 0) {
      console.log("No tasks.");
      break;
    }

    tasks.forEach(task => {
      const status = task.completed ? "✓" : " ";
      console.log(`${task.id}. [${status}] ${task.title}`);
    });

    break;
  }

  case "done": {
    const id = Number(argument);

    const task = tasks.find(task => task.id === id);

    if (!task) {
      console.log("Task not found.");
      break;
    }

    task.completed = true;
    saveTasks(tasks);

    console.log(`Completed: ${task.title}`);
    break;
  }

  case "delete": {
    const id = Number(argument);

    const task = tasks.find(task => task.id === id);

    if (!task) {
      console.log("Task not found.");
      break;
    }

    tasks = tasks.filter(task => task.id !== id);
    saveTasks(tasks);

    console.log(`Deleted: ${task.title}`);
    break;
  }

  default:
    console.log(`
Task Manager

Commands:
  node index.js add "Learn JavaScript"
  node index.js list
  node index.js done 1
  node index.js delete 1
`);
}