// --- Configuration ---
const API_URL = 'http://localhost:3000/api/notes';
const SECRET_TOKEN = 'my_super_secret_token_123'; // เปลี่ยนให้ตรงกับใน .env ของคุณ

let notes = [];
let editingNoteId = null;

// --- 1. ฟังก์ชันแสดง Loading State (+5 Points) ---
function showLoading(isLoading, message = "⏳ Loading...") {
  const container = document.getElementById('notesContainer');
  if (isLoading) {
    container.innerHTML = `
      <div class="empty-state">
        <h2>${message}</h2>
      </div>`;
  }
}

// --- 2. การดึงข้อมูล (Read) ---
async function loadNotes() {
  showLoading(true); // แสดง Loading ทันทีที่เริ่มดึงข้อมูล
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Failed to fetch');
    
    notes = await response.json();
    renderNotes();
  } catch (error) {
    console.error('Error:', error);
    showLoading(true, "❌ ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้");
  }
}

// --- 3. การบันทึกข้อมูล (Create/Update) ---
async function saveNote(event) {
  event.preventDefault();

  const title = document.getElementById('noteTitle').value.trim();
  const content = document.getElementById('noteContent').value.trim();
  const submitBtn = document.querySelector('.save-btn');
  const originalBtnText = submitBtn.textContent;

  // --- ใส่ Loading ที่ปุ่ม ---
  submitBtn.textContent = '⏳ Saving...';
  submitBtn.disabled = true;

  try {
    let response;
    if (editingNoteId) {
      // Update Mode
      response = await fetch(`${API_URL}/${editingNoteId}`, {
        method: 'PATCH', // หรือ PUT ตามที่ backend รองรับ
        headers: {
          'Content-Type': 'application/json',
          'Authorization': SECRET_TOKEN
        },
        body: JSON.stringify({ title, content })
      });
    } else {
      // Add Mode
      response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': SECRET_TOKEN
        },
        body: JSON.stringify({ title, content })
      });
    }

    if (!response.ok) throw new Error('Failed to save');

    closeNoteDialog();
    await loadNotes(); // โหลดข้อมูลใหม่หลังจากบันทึกเสร็จ
  } catch (error) {
    alert('เกิดข้อผิดพลาด: ' + error.message);
  } finally {
    // คืนค่าปุ่มกลับมาปกติ
    submitBtn.textContent = originalBtnText;
    submitBtn.disabled = false;
  }
}

// --- 4. การลบข้อมูล (Delete) ---
async function deleteNote(noteId) {
  if (!confirm("Are you sure you want to delete this note?")) return;

  showLoading(true, "🗑️ Deleting...");
  try {
    const response = await fetch(`${API_URL}/${noteId}`, {
      method: 'DELETE',
      headers: { 'Authorization': SECRET_TOKEN }
    });

    if (!response.ok) throw new Error('Failed to delete');
    await loadNotes();
  } catch (error) {
    alert('Delete failed');
    renderNotes();
  }
}

// --- ส่วนของการจัดการ UI (ใช้โค้ดเดิมของคุณ) ---

function renderNotes() {
  const notesContainer = document.getElementById('notesContainer');

  if(notes.length === 0) {
    notesContainer.innerHTML = `
      <div class="empty-state">
        <h2>No notes yet</h2>
        <p>Create your first note to get started!</p>
        <button class="add-note-btn" onclick="openNoteDialog()">+ Add Your First Note</button>
      </div>
    `;
    return;
  }

  notesContainer.innerHTML = notes.map(note => `
    <div class="note-card">
      <h3 class="note-title">${note.title}</h3>
      <p class="note-content">${note.content}</p>
      <div class="note-actions">
        <button class="edit-btn" onclick="openNoteDialog('${note.id}')" title="Edit Note">✏️</button>
        <button class="delete-btn" onclick="deleteNote('${note.id}')" title="Delete Note">🗑️</button>
      </div>
    </div>
  `).join('');
}

function openNoteDialog(noteId = null) {
  const dialog = document.getElementById('noteDialog');
  const titleInput = document.getElementById('noteTitle');
  const contentInput = document.getElementById('noteContent');

  if(noteId) {
    const noteToEdit = notes.find(note => note.id === noteId);
    editingNoteId = noteId;
    document.getElementById('dialogTitle').textContent = 'Edit Note';
    titleInput.value = noteToEdit.title;
    contentInput.value = noteToEdit.content;
  } else {
    editingNoteId = null;
    document.getElementById('dialogTitle').textContent = 'Add New Note';
    titleInput.value = '';
    contentInput.value = '';
  }
  dialog.showModal();
}

function closeNoteDialog() {
  document.getElementById('noteDialog').close();
}

document.addEventListener('DOMContentLoaded', () => {
  loadNotes();
  document.getElementById('noteForm').addEventListener('submit', saveNote);
});