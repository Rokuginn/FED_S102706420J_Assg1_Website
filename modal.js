// Function to open the modal
const openModal = () => {
    const modal = document.getElementById('auth-modal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
    clearFormFields(); // Clear form fields when the modal is opened
};

// Function to close the modal
const closeModal = () => {
    const modal = document.getElementById('auth-modal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto'; // Restore scrolling
    clearFormFields(); // Clear form fields when the modal is closed
};

// Function to clear form fields
const clearFormFields = () => {
    const signupForm = document.getElementById('signup');
    const loginForm = document.getElementById('login');
    if (signupForm) signupForm.reset();
    if (loginForm) loginForm.reset();
};

// Event listeners for opening and closing the modal
document.getElementById('open-auth-modal').addEventListener('click', openModal);
document.getElementById('close-auth-modal').addEventListener('click', closeModal);

// Close modal when clicking outside of the modal content
window.addEventListener('click', (event) => {
    const modal = document.getElementById('auth-modal');
    if (event.target === modal) {
        closeModal();
    }
});

// Sign-up form submission
document.getElementById('signup').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some(user => user.username === username);

    if (userExists) {
        alert('Username already exists');
    } else {
        users.push({ username, password, membership: 'standard', cart: [], purchases: [] });
        localStorage.setItem('users', JSON.stringify(users));
        alert('Sign up successful');
        closeModal();
    }
});

// Log-in form submission
document.getElementById('login').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        alert('Log in successful');
        closeModal();
        setTimeout(() => {
            window.location.href = 'index.html'; // Redirect to homepage
        }, 100); // Delay to ensure modal is closed before redirect
    } else {
        alert('Invalid username or password');
    }
});

// Update navbar on page load
document.addEventListener('DOMContentLoaded', () => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const authButtons = document.getElementById('auth-buttons');

    if (loggedInUser) {
        authButtons.innerHTML = `
            <span class="welcome-text">Hello, ${loggedInUser.username}</span>
            <button id="logout" class="button">Log Out</button>
        `;

        document.getElementById('logout').addEventListener('click', () => {
            localStorage.removeItem('loggedInUser');
            window.location.href = 'index.html'; // Redirect to homepage
        });
    }
});