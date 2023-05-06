// Mendapatkan elemen HTML yang diperlukan
const form = document.querySelector('form');
const input = document.querySelector('#new-task');
const taskList = document.querySelector('#task-list');

// Membuat variabel untuk menyimpan daftar tugas
let tasks = [];

// Fungsi untuk menambahkan tugas ke dalam daftar
function addTask(event) {
  event.preventDefault(); // Mencegah form dari submit
  const taskName = input.value.trim(); // Mengambil value dari input
  if (taskName !== '') {
    const task = {
      id: Date.now(), // Membuat id tugas dengan timestamp
      name: taskName,
      completed: false
    };
    tasks.push(task); // Menambahkan tugas ke dalam array tasks
    renderTasks(); // Memperbarui tampilan daftar tugas
    input.value = ''; // Mengosongkan input
    input.focus(); // Fokus kembali ke input
  }
}

// Fungsi untuk menghapus tugas dari daftar
function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id); // Menghapus tugas dengan id tertentu dari array tasks
  renderTasks(); // Memperbarui tampilan daftar tugas
}

// Fungsi untuk menandai tugas sebagai selesai atau belum selesai
function toggleTask(id) {
  tasks = tasks.map(task => {
    if (task.id === id) {
      return {
        ...task,
        completed: !task.completed
      };
    }
    return task;
  });
  renderTasks(); // Memperbarui tampilan daftar tugas
}

// Fungsi untuk membuat elemen li untuk setiap tugas dalam array tasks
function createTaskElement(task) {
  const taskElement = document.createElement('li');
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = task.completed;
  checkbox.addEventListener('change', () => toggleTask(task.id));
  const taskName = document.createElement('span');
  taskName.textContent = task.name;
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', () => deleteTask(task.id));
  taskElement.append(checkbox, taskName, deleteButton);
  return taskElement;
}

// Fungsi untuk memperbarui tampilan daftar tugas
function renderTasks() {
  taskList.innerHTML = ''; // Menghapus semua elemen li yang ada dalam ul
  tasks.forEach(task => {
    const taskElement = createTaskElement(task);
    taskList.append(taskElement);
  });
}

// Event listener untuk form ketika submit
form.addEventListener('submit', addTask);

// Memperbarui tampilan daftar tugas pada saat load
renderTasks();