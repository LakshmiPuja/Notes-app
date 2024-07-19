document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerButton = document.getElementById('registerButton');
    const loginButton = document.getElementById('loginButton');
    const registerForm = document.getElementById('registerForm');
    const regButton = document.getElementById('regButton');

    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            try {
                const response = await fetch('http://localhost:3000/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password })
                });
                if (response.ok) {
                    const { token } = await response.json();
                    localStorage.setItem('token', token);
                    console.log(token);
                    window.location.href = 'note.html'; // Redirect to notes page
                } else {
                    alert('Login failed. Please check your credentials.');
                }
            } catch (error) {
                console.error('Login error:', error);
                alert('Error during login. Please try again later.');
            }
        });
    }

    if (registerButton) {
        registerButton.addEventListener('click', () => {
            window.location.href = 'register.html';
        });
    }
    if (regButton) {
        regButton.addEventListener('submit', () => {
            window.location.href = 'note.html';
        });
    }

    if (loginButton) {
        loginButton.addEventListener('click', () => {
            window.location.href = 'note.html';
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const username = document.getElementById('newUsername').value;
            const password = document.getElementById('newPassword').value;
            try {
                const response = await fetch('http://localhost:3000/api/auth/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password })
                });
                if (response.ok) {
                    alert('Registration successful. Please login.');
                    window.location.href = 'index.html'; // Redirect to login page
                } else {
                    alert('Registration failed. Please try again.');
                }
            } catch (error) {
                console.error('Registration error:', error);
                alert('Error during registration. Please try again later.');
            }
        });
    }

    const fetchNotes = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/notes/getAll', {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            if (response.ok) {
                const notes = await response.json();
                displayNotes(notes);
            } else {
                throw new Error('Failed to fetch notes');
            }
        } catch (error) {
            console.error('Fetch notes error:', error);
            alert('Error fetching notes. Please try again later.');
        }
    };

    const displayNotes = (notes) => {
        const notesContainer = document.getElementById('notes-container');
        notesContainer.innerHTML = '';
        notes.forEach(note => {
            const noteElement = document.createElement('div');
            noteElement.classList.add('note');
            noteElement.style.backgroundColor = note.backgroundColor;
            noteElement.innerHTML = `
                <div class="note-title">${note.title}</div>
                <div class="note-content">${note.content}</div>
                <div class="note-tags">${note.tags.join(', ')}</div>
                <div class="note-actions">
                    <button onclick="archiveNote('${note._id}')">Archive</button>
                    <button onclick="trashNote('${note._id}')">Trash</button>
                </div>
            `;
            notesContainer.appendChild(noteElement);
        });
    };

    document.getElementById('create-note-form')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = document.getElementById('note-title').value;
        const content = document.getElementById('note-content').value;
        const backgroundColor = document.getElementById('note-color').value;
        const tags = document.getElementById('note-tags').value.split(',');
        const reminder = document.getElementById('note-reminder').value;

        try {
            const response = await fetch('http://localhost:3000/api/notes/addNote', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ title, content, backgroundColor, tags, reminder })
            });

            if (response.ok) {
                alert('Note created successfully');
                fetchNotes();
            } else {
                throw new Error('Failed to create note');
            }
        } catch (error) {
            console.error('Create note error:', error);
            alert('Error creating note. Please try again later.');
        }
    });

    const archiveNote = async (noteId) => {
        try {
            const response = await fetch(`http://localhost:3000/api/notes/${noteId}/archived`, {
                method: 'PUT',
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });

            if (response.ok) {
                alert('Note archived successfully');
                fetchNotes();
            } else {
                throw new Error('Failed to archive note');
            }
        } catch (error) {
            console.error('Archive note error:', error);
            alert('Error archiving note. Please try again later.');
        }
    };

    const trashNote = async (noteId) => {
        try {
            const response = await fetch(`http://localhost:3000/api/notes/${noteId}/trashed`, {
                method: 'PUT',
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });

            if (response.ok) {
                alert('Note trashed successfully');
                fetchNotes();
            } else {
                throw new Error('Failed to trash note');
            }
        } catch (error) {
            console.error('Trash note error:', error);
            alert('Error trashing note. Please try again later.');
        }
    };

    fetchNotes();
});
