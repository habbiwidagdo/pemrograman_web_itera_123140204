// Key localStorage
const STORAGE_KEY = 'tasks'

// DOM
const taskForm = document.getElementById('task-form')
const taskIdInput = document.getElementById('task-id')
const nameInput = document.getElementById('task-name')
const courseInput = document.getElementById('task-course')
const deadlineInput = document.getElementById('task-deadline')
const submitBtn = document.getElementById('submit-btn')
const resetBtn = document.getElementById('reset-btn')
const errorEl = document.getElementById('form-error')
const taskList = document.getElementById('task-list')
const filterStatus = document.getElementById('filter-status')
const searchInput = document.getElementById('search-input')
const pendingCount = document.getElementById('pending-count')
const clearStorageBtn = document.getElementById('clear-storage')

let tasks = []

// Inisialisasi
function loadTasks(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY)
    tasks = raw ? JSON.parse(raw) : []
  }catch(e){
    console.error('Gagal membaca localStorage', e)
    tasks = []
  }
}

function saveTasks(){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
}

// Util
function isValidDateString(s){
  if(!s) return false
  const d = new Date(s + 'T00:00:00')
  return !isNaN(d.getTime())
}

function isPastDate(s){
  const today = new Date()
  today.setHours(0,0,0,0)
  const d = new Date(s + 'T00:00:00')
  return d < today
}

function formatDate(s){
  const d = new Date(s + 'T00:00:00')
  return d.toLocaleDateString('id-ID', {year:'numeric', month:'short', day:'numeric'})
}

function render(){
  // filter & search
  const statusFilter = filterStatus.value
  const q = (searchInput.value || '').trim().toLowerCase()

  const filtered = tasks.filter(t=>{
    if(statusFilter === 'pending' && t.completed) return false
    if(statusFilter === 'completed' && !t.completed) return false
    if(!q) return true
    return (t.name + ' ' + t.course).toLowerCase().includes(q)
  })

  taskList.innerHTML = ''

  if(filtered.length === 0){
    taskList.innerHTML = '<li class="small">Tidak ada tugas sesuai filter.</li>'
  }else{
    filtered.forEach(t=>{
      const li = document.createElement('li')
      li.className = 'task-item' + (t.completed ? ' completed' : '')
      li.dataset.id = t.id

      const main = document.createElement('div')
      main.className = 'task-main'

      const chk = document.createElement('input')
      chk.type = 'checkbox'
      chk.checked = !!t.completed
      chk.title = 'Tandai selesai'
      chk.addEventListener('change', ()=> toggleComplete(t.id))

      const info = document.createElement('div')
      info.className = 'task-info'
      const title = document.createElement('div')
      title.className = 'task-name'
      title.textContent = t.name
      const meta = document.createElement('div')
      meta.className = 'task-meta'
      meta.textContent = `${t.course} • Deadline: ${formatDate(t.deadline)}`

      info.appendChild(title)
      info.appendChild(meta)

      main.appendChild(chk)
      main.appendChild(info)

      const actions = document.createElement('div')
      actions.className = 'task-actions'

      const editBtn = document.createElement('button')
      editBtn.className = 'btn-icon'
      editBtn.type = 'button'
      editBtn.textContent = 'Edit'
      editBtn.addEventListener('click', ()=> startEdit(t.id))

      const delBtn = document.createElement('button')
      delBtn.className = 'btn-icon'
      delBtn.type = 'button'
      delBtn.textContent = 'Hapus'
      delBtn.addEventListener('click', ()=> deleteTask(t.id))

      actions.appendChild(editBtn)
      actions.appendChild(delBtn)

      li.appendChild(main)
      li.appendChild(actions)
      taskList.appendChild(li)
    })
  }

  const pending = tasks.filter(t => !t.completed).length
  pendingCount.textContent = pending
}

// CRUD
function addTask(name, course, deadline){
  const newTask = {
    id: Date.now().toString(),
    name: name.trim(),
    course: course.trim(),
    deadline: deadline,
    completed: false,
    createdAt: new Date().toISOString()
  }
  tasks.push(newTask)
  saveTasks()
  render()
}

function updateTask(id, {name, course, deadline}){
  const idx = tasks.findIndex(t=>t.id === id)
  if(idx === -1) return false
  tasks[idx].name = name.trim()
  tasks[idx].course = course.trim()
  tasks[idx].deadline = deadline
  saveTasks()
  render()
  return true
}

function deleteTask(id){
  if(!confirm('Yakin ingin menghapus tugas ini?')) return
  tasks = tasks.filter(t=>t.id !== id)
  saveTasks()
  render()
}

function toggleComplete(id){
  const t = tasks.find(x=>x.id === id)
  if(!t) return
  t.completed = !t.completed
  saveTasks()
  render()
}

function startEdit(id){
  const t = tasks.find(x=>x.id === id)
  if(!t) return
  taskIdInput.value = t.id
  nameInput.value = t.name
  courseInput.value = t.course
  deadlineInput.value = t.deadline
  submitBtn.textContent = 'Simpan Perubahan'
}

function resetForm(){
  taskIdInput.value = ''
  taskForm.reset()
  submitBtn.textContent = 'Tambah Tugas'
  errorEl.textContent = ''
}

// Handlers
taskForm.addEventListener('submit', (e)=>{
  e.preventDefault()
  const id = taskIdInput.value
  const name = nameInput.value || ''
  const course = courseInput.value || ''
  const deadline = deadlineInput.value || ''

  // Validasi
  if(!name.trim()){
    errorEl.textContent = 'Nama tugas tidak boleh kosong.'
    return
  }
  if(!course.trim()){
    errorEl.textContent = 'Mata kuliah tidak boleh kosong.'
    return
  }
  if(!isValidDateString(deadline)){
    errorEl.textContent = 'Deadline tidak valid.'
    return
  }
  if(isPastDate(deadline)){
    errorEl.textContent = 'Deadline tidak boleh di masa lalu.'
    return
  }

  if(id){
    const ok = updateTask(id, {name, course, deadline})
    if(ok){
      resetForm()
    } else {
      errorEl.textContent = 'Gagal memperbarui tugas: ID tidak ditemukan.'
    }
  } else {
    addTask(name, course, deadline)
    resetForm()
  }
})

// Reset button
resetBtn.addEventListener('click', (e)=>{
  e.preventDefault()
  resetForm()
})

// Filter & search handlers
filterStatus.addEventListener('change', render)
searchInput.addEventListener('input', render)

// Clear all storage
clearStorageBtn.addEventListener('click', ()=>{
  if(!confirm('Hapus semua tugas dan data lokal?')) return
  tasks = []
  saveTasks()
  render()
})

// Setup awal
loadTasks()
render()

// Expose untuk debugging (opsional)
window._tasks_app = {
  get tasks(){ return tasks },
  save: saveTasks,
  load: loadTasks,
  render: render
}
