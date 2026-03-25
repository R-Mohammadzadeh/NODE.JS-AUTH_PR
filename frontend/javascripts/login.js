/* ------------------------------------
   1. Animation: Switch between Forms
------------------------------------ */
const signupButton = document.getElementById('signup-button');
const loginButton = document.getElementById('login-button');
const userForms = document.getElementById('user_options-forms');

signupButton.addEventListener('click', () => {
    userForms.classList.remove('bounceRight');
    userForms.classList.add('bounceLeft');
}, false);

loginButton.addEventListener('click', () => {
    userForms.classList.remove('bounceLeft');
    userForms.classList.add('bounceRight');
}, false);

/* ------------------------------------
   2. Login Form Handling
------------------------------------ */
const loginForm = document.querySelector('.user_forms-login .forms_form');

loginForm.addEventListener('submit', async (e) => {
    // Prevent default form submission (stops URL query strings)
    e.preventDefault(); 

    const formData = new FormData(loginForm);
    const data = Object.fromEntries(formData);

    try {
        const res = await fetch('/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await res.json();

        if (res.ok) {
            Swal.fire('Success', 'Welcome back!', 'success').then(() => {
                // Redirect to dashboard or home page
                window.location.href = '/dashboard'; 
            });
        } else {
            Swal.fire('Error', result.message || 'Login failed', 'error');
        }
    } catch (err) {
        Swal.fire('Error', 'Server connection failed', 'error');
    }
});

/* ------------------------------------
   3. Forgot Password Handling
------------------------------------ */
const forgotBtn = document.querySelector('.forms_buttons-forgot');


/* ------------------------------------
   4. Signup Form Handling
------------------------------------ */
const signupForm = document.querySelector('.user_forms-signup .forms_form');

signupForm.addEventListener('submit', async (e) => {
    e.preventDefault(); 

    const formData = new FormData(signupForm);
    const data = Object.fromEntries(formData);

    try {
        const res = await fetch('/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await res.json();

        if (res.ok) {
            Swal.fire('Success', 'Account created! Now you can login.', 'success').then(() => {
                // Switch back to login form automatically
                loginButton.click(); 
            });
        } else {
            Swal.fire('Error', result.message || 'Registration failed', 'error');
        }
    } catch (err) {
        Swal.fire('Error', 'Server connection failed', 'error');
    }
});


forgotBtn.addEventListener('click', async () => {
    // Open SweetAlert with an email input field
    const { value: email } = await Swal.fire({
        title: 'Forgot Password?',
        input: 'email',
        inputLabel: 'Enter your email address',
        inputPlaceholder: 'example@gmail.com',
        showCancelButton: true,
        confirmButtonColor: '#e8716d',
        confirmButtonText: 'Send Reset Link'
    });

    if (email) {
        // Show loading spinner while waiting for server
        Swal.showLoading(); 

        try {
            const res = await fetch('/auth/forgotPassword', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            
            const result = await res.json();
            
            if (res.ok) {
                Swal.fire('Sent!', 'Check your Mailtrap inbox for the reset link.', 'success');
            } else {
                Swal.fire('Error', result.message || 'User not found', 'error');
            }
        } catch (err) {
            Swal.fire('Error', 'Failed to send request. Please try again.', 'error');
        }
    }
});