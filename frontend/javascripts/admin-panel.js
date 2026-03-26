/**
 * Admin Panel Logic - Final Stable Fix
 * All comments in English.
 */

window.onload = () => {
    console.log("Admin System Ready");

    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    const nameDisplay = document.getElementById('userNameDisplay');
    const roleDisplay = document.getElementById('userRoleDisplay');

    // --- sidebar control ---
    if (menuToggle && sidebar) {
        menuToggle.onclick = (e) => {
            e.stopPropagation();
            sidebar.classList.toggle('active');
            menuToggle.textContent = sidebar.classList.contains('active') ? '✕' : '☰';
        };
    }

    //greeting and date-time 
    updateDateTime();
    setInterval(updateDateTime, 1000);

    // data from localStorage (should be set by login process)  
    const rawData = localStorage.getItem('user');
    if (rawData) {
        const responseData = JSON.parse(rawData);
        const userData = responseData.user || responseData;

        // animated greeting
        const subTitle = document.querySelector('.header-title p');
        if (subTitle) {
            const hour = new Date().getHours();
            let greeting = hour < 12 ? "Good Morning " : (hour < 18 ? "Good Afternoon " : "Good Evening 🌙");
            subTitle.textContent = `${greeting}, ${userData.name || userData.email.split('@')[0]}`;
            subTitle.classList.add('fade-in-text'); 
        }

        if (nameDisplay) nameDisplay.textContent = userData.name || userData.email.split('@')[0];
        if (roleDisplay) {
            roleDisplay.textContent = (userData.role || 'Admin').toUpperCase();
            roleDisplay.style.display = 'inline-block';
        }
    }

    // --- fetch data   ---
    if (document.getElementById('userTableBody')) fetchAllUsers();
    if (document.getElementById('roomsChart')) initRoomsChart();
};

// date and time update function with better formatting and localization 
function updateDateTime() {
    const now = new Date();
    const dateOptions = { weekday: 'long', month: 'short', day: 'numeric' };
    if(document.getElementById('currentDate')) 
        document.getElementById('currentDate').textContent = now.toLocaleDateString('en-US', dateOptions);
    if(document.getElementById('currentTime')) 
        document.getElementById('currentTime').textContent = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

// function to initialize the rooms chart with dummy data (replace with real API data as needed)
function initRoomsChart() {
    const ctx = document.getElementById('roomsChart').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut', // من دایره‌ای توخالی رو پیشنهاد میدم، شیک‌تره!
        data: {
            labels: ['Occupied', 'Vacant', 'Cleaning'],
            datasets: [{
                data: [42, 5, 3],
                backgroundColor: ['#ff7675', '#55efc4', '#ffeaa7'],
                borderWidth: 0
            }]
        },
        options: { cutout: '70%', plugins: { legend: { position: 'bottom' } } }
    });
}


async function fetchAllUsers() {
    const tableBody = document.getElementById('userTableBody');
    if (!tableBody) return;

    try {
        const response = await fetch('/api/admin/all-users');
        const data = await response.json();
        
        tableBody.innerHTML = data.map(user => `
            <tr>
                <td data-label="NAME">${user.name || 'User'}</td>
                <td data-label="NAME">${user.email}</td>
                <td data-label="NAME"><span class="status confirmed">${user.role}</span></td>
                <td data-label="NAME">
                    <button onclick="deleteUser('${user._id}')" style="color:red; border:none; background:none; cursor:pointer;">Delete</button>
                </td>
            </tr>
        `).join('');
    } catch (err) {
        tableBody.innerHTML = '<tr><td colspan="4">Error Loading Data</td></tr>';
    }
}

window.deleteUser = async function(id) {
    if (confirm("Are you sure?")) {
        await fetch(`/api/user/${id}`, { method: 'DELETE' });
        fetchAllUsers();
    }
};







