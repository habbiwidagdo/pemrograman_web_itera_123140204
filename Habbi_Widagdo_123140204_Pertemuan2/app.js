'use strict';

document.addEventListener('DOMContentLoaded', () => {

    class Task {
        constructor(judul, matkul, deadline) {
            this.id = Date.now();
            this.judul = judul;
            this.matkul = matkul;
            this.deadline = deadline;
            this.isCompleted = false;
        }

        toggleComplete() {
            this.isCompleted = !this.isCompleted;
        }
    }

    const todoForm = document.getElementById('todo-form');
    const inputJudul = document.getElementById('input-judul');
    const inputMatkul = document.getElementById('input-matkul');
    const inputDeadline = document.getElementById('input-deadline');
    const todoListContainer = document.getElementById('todo-list-container');
    const widgetWaktu = document.getElementById('widget-waktu');

    let todos = [];

    const saveTasks = () => {
        localStorage.setItem('dashboardTasks', JSON.stringify(todos));
    };

    const loadTasks = () => {
        const tasksJSON = localStorage.getItem('dashboardTasks');
        if (tasksJSON) {
            const tasksData = JSON.parse(tasksJSON);
            todos = tasksData.map(taskData => {
                const task = new Task(taskData.judul, taskData.matkul, taskData.deadline);
                task.id = taskData.id;
                task.isCompleted = taskData.isCompleted;
                return task;
            });
        }
    };

    const renderTasks = () => {
        todoListContainer.innerHTML = '';

        if (todos.length === 0) {
            todoListContainer.innerHTML = '<p class="text-muted">Belum ada tugas.</p>';
            return;
        }

        todos.forEach(task => {
            const completedClass = task.isCompleted ? 'task-completed' : '';
            const buttonText = task.isCompleted ? 'Batal' : 'Selesai';
            const buttonClass = task.isCompleted ? 'btn-warning' : 'btn-success';
            
            const deadlineDate = new Date(task.deadline);
            const formattedDeadline = deadlineDate.toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });

            const taskHTML = `
                <div class="list-group-item list-group-item-action ${completedClass}">
                    <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">${task.judul}</h5>
                        <small>Deadline: ${formattedDeadline}</small>
                    </div>
                    <p class="mb-1">Mata Kuliah: ${task.matkul}</p>
                    <div class="mt-2">
                        <button class="btn ${buttonClass} btn-sm" data-id="${task.id}" data-action="toggle">
                            ${buttonText}
                        </button>
                        <button class="btn btn-danger btn-sm" data-id="${task.id}" data-action="delete">
                            Hapus
                        </button>
                    </div>
                </div>
            `;
            todoListContainer.insertAdjacentHTML('beforeend', taskHTML);
        });
    };

    const handleFormSubmit = (event) => {
        event.preventDefault(); 

        const judul = inputJudul.value.trim();
        const matkul = inputMatkul.value.trim();
        const deadline = inputDeadline.value;

        if (judul && matkul && deadline) {
            const newTask = new Task(judul, matkul, deadline);
            
            todos.push(newTask);
            
            saveTasks();
            renderTasks();
            todoForm.reset();
        } else {
            alert('Harap isi semua kolom!');
        }
    };

    const handleListClick = (event) => {
        const target = event.target;
        
        if (target.tagName !== 'BUTTON') return;

        const action = target.dataset.action;
        const id = parseInt(target.dataset.id);

        if (action === 'delete') {
            if (confirm('Apakah Anda yakin ingin menghapus tugas ini?')) {
                todos = todos.filter(task => task.id !== id);
                saveTasks();
                renderTasks();
            }
        }

        if (action === 'toggle') {
            const task = todos.find(task => task.id === id);
            if (task) {
                task.toggleComplete();
                saveTasks();
                renderTasks();
            }
        }
    };

    todoForm.addEventListener('submit', handleFormSubmit);
    todoListContainer.addEventListener('click', handleListClick);

    const fetchWaktu = async () => {
        try {
            const response = await fetch('https://worldtimeapi.org/api/timezone/Asia/Jakarta');
            
            if (!response.ok) {
                throw new Error(`Gagal mengambil data: ${response.statusText}`);
            }

            const data = await response.json();
            
            const dateTime = new Date(data.datetime);
            const timeString = dateTime.toLocaleTimeString('id-ID', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
            const dateString = dateTime.toLocaleDateString('id-ID', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });

            widgetWaktu.innerHTML = `
                <h5 class="card-title">Waktu & Tanggal (Jakarta)</h5>
                <h3 class="display-6">${timeString}</h3>
                <p class="card-text">${dateString}</p>
            `;

        } catch (error) {
            console.error('Error fetching waktu:', error);
            widgetWaktu.innerHTML = `
                <h5 class="card-title">Waktu & Tanggal</h5>
                <p class="text-danger">Gagal memuat data waktu.</p>
            `;
        }
    };

    loadTasks();
    
    renderTasks();
    
    fetchWaktu();
});