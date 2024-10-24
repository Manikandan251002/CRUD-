
document.addEventListener("DOMContentLoaded", function () {
    const createBtn = document.getElementById("createBtn");
    const userList = document.getElementById("userList");
    let users = JSON.parse(localStorage.getItem('users')) || [];

    function renderUsers() {
        userList.innerHTML = '';
        users.forEach((user, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td class="actions">
                    <button class="edit" onclick="editUser(${index})">Edit</button>
                    <button class="delete" onclick="deleteUser(${index})">Delete</button>
                </td>
            `;
            userList.appendChild(row);
        });
    }

    
    createBtn.addEventListener("click", function () {
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value; 

        if (name && email) {
            users.push({ name, email });
            localStorage.setItem('users', JSON.stringify(users));
            renderUsers();
        }
    }); 

    
    window.editUser = function (index) {
        const name = prompt("Enter new name:", users[index].name);
        const email = prompt("Enter new email:", users[index].email);

        if (name && email) {
            users[index] = { name, email };
            localStorage.setItem('users', JSON.stringify(users));
            renderUsers();
        }
    };

    
    window.deleteUser = function (index) {
        if (confirm("Are you sure you want to delete this user?")) {
            users.splice(index, 1);
            localStorage.setItem('users', JSON.stringify(users));
            renderUsers();
        }
    };

    
    renderUsers();
});
