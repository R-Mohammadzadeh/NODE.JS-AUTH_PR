

const userContainer = document.querySelector('.userContainer');
const logoutBtn = document.getElementById('logout-btn')


window.addEventListener('load', async () => {
    try {
      
        const res = await fetch('/api/user', {
            credentials: 'include'
        });

        const data = await res.json();

        if (!res.ok) {
            userContainer.innerHTML = `<p style="color:red">${data.message || 'Error'}</p>`;
            return;
        }

        userContainer.innerHTML = ''; 

        const allUsers = Array.isArray(data) ? data : (data.user ? [data.user] : []);

        if (allUsers.length === 0) {
            userContainer.innerHTML = '<p>No users found.</p>';
            return;
        }

        allUsers.forEach((user) => {
           const userCard = `
                <div class="user-card" style="border: 1px solid #ddd; padding: 15px; margin: 10px; border-radius: 8px; display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <p><strong>Name:</strong> ${user.name} ${user.family}</p>
                        <p><strong>Email:</strong> ${user.email}</p>
                        <p><small>Role: ${user.role}</small></p>
                    </div>
                    <button onclick="deleteHandler('${user._id}')" 
                            style="background: #e8716d; color: white; border: none; padding: 8px 15px; border-radius: 5px; cursor: pointer;">
                        Delete
                    </button>
                </div>`;
             userCard.innerHTML += userCard   
        });

    } catch (err) {
        console.error("Fetch Error:", err);
        userContainer.innerHTML = '<p style="color:red">Server connection failed</p>';
    }
});


// delete handler
async function deleteHandler(id) {
  
    const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#e8716d',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
    });

    if (!result.isConfirmed) return;

    try {
        const res = await fetch(`/api/user/${id}`, {
            method: 'DELETE',
            credentials: 'include'
        });

        const data = await res.json();

        if (res.ok) {
            await Swal.fire('Deleted!', 'User removed successfully.', 'success');
            location.reload(); 
        } else {
            Swal.fire('Failed!', data.message || 'Access denied' , 'error');
        }
    } catch (err) {
        Swal.fire('Error', 'Could not connect to server', 'error');
    }
}


// logout handler

logoutBtn.addEventListener('click' , async () => {
    const result = await Swal.fire({
        title : 'Are you sure?',
        text: "You will be logged out of your account!",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#e8716d',
        confirmButtonText: 'Yes, Logout'
    })

if(result.isConfirmed){
    try{
        const res = await fetch('/auth/logout' , {
            method : 'POST' , 
            credentials : 'include'
        })
        if(res.ok){
            window.location.href ='/login'
        }
    }
    catch(err){
        Swal.fire('Error' , 'Logout failed' , 'error')
    }
}

})






