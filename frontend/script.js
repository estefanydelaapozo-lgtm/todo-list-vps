// Nginx redirige las peticiones que empiezan con /api hacia el backend Node.js
const API_URL = '/api/tasks';

const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const filterInput = document.getElementById('filter-input');
const taskList = document.getElementById('task-list');
const emptyMessage = document.getElementById('empty-message');

let tasks = [];

// --- Obtener y renderizar tareas ---
async function fetchTasks() {
  try {
    const res = await fetch(API_URL);
    tasks = await res.json();
    renderTasks();
  } catch (err) {
    console.error('Error al obtener las tareas:', err);
  }
}

function renderTasks() {
  const filterText = filterInput.value.trim().toLowerCase();
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(filterText)
  );

  taskList.innerHTML = '';

  if (filteredTasks.length === 0) {
    emptyMessage.style.display = 'block';
  } else {
    emptyMessage.style.display = 'none';
  }

  filteredTasks.forEach((task) => {
    const li = document.createElement('li');
    li.className = 'task-item' + (task.completed ? ' completed' : '');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = !!task.completed;
    checkbox.addEventListener('change', () => toggleCompleted(task));

    const span = document.createElement('span');
    span.className = 'task-title';
    span.textContent = task.title;

    const editBtn = document.createElement('button');
    editBtn.className = 'edit-btn';
    editBtn.textContent = '✏️';
    editBtn.addEventListener('click', () => editTask(task));

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = '🗑️';
    deleteBtn.addEventListener('click', () => deleteTask(task.id));

    li.append(checkbox, span, editBtn, deleteBtn);
    taskList.appendChild(li);
  });
}

// --- Crear tarea ---
taskForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = taskInput.value.trim();
  if (!title) return;

  try {
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    });
    taskInput.value = '';
    await fetchTasks();
  } catch (err) {
    console.error('Error al crear la tarea:', err);
  }
});

// --- Actualizar estado completado ---
async function toggleCompleted(task) {
  try {
    await fetch(`${API_URL}/${task.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !task.completed }),
    });
    await fetchTasks();
  } catch (err) {
    console.error('Error al actualizar la tarea:', err);
  }
}

// --- Editar titulo de la tarea ---
async function editTask(task) {
  const newTitle = prompt('Editar tarea:', task.title);
  if (newTitle === null || !newTitle.trim() || newTitle.trim() === task.title) return;

  try {
    await fetch(`${API_URL}/${task.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTitle.trim() }),
    });
    await fetchTasks();
  } catch (err) {
    console.error('Error al editar la tarea:', err);
  }
}

// --- Eliminar tarea ---
async function deleteTask(id) {
  if (!confirm('¿Seguro que queres eliminar esta tarea?')) return;

  try {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    await fetchTasks();
  } catch (err) {
    console.error('Error al eliminar la tarea:', err);
  }
}

// --- Filtro en tiempo real ---
filterInput.addEventListener('input', renderTasks);

// Carga inicial
fetchTasks();
