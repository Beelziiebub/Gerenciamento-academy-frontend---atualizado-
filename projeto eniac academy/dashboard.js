document.addEventListener("DOMContentLoaded", function () {
    const userList = document.getElementById("user-list");
    const logoutButton = document.getElementById("logout");

    // Função para buscar usuários
    async function fetchUsers() {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("Você não está logado!");
                window.location.href = "login.html"; // Redireciona para o login
                return;
            }

            const response = await fetch("http://localhost:5000/users", {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (!response.ok) {
                throw new Error("Erro ao buscar usuários.");
            }

            const data = await response.json();
            renderUsers(data);
        } catch (error) {
            alert("Erro ao buscar usuários, faça login novamente.");
            localStorage.removeItem("token");
            window.location.href = "login.html"; // Redireciona para o login
        }
    }

    // Função para exibir usuários na lista
    function renderUsers(users) {
        userList.innerHTML = "";
        users.forEach(user => {
            const li = document.createElement("li");
            li.textContent = `${user.name} (${user.role})`;
            userList.appendChild(li);
        });
    }

    // Logout do usuário
    logoutButton.addEventListener("click", function () {
        localStorage.removeItem("token");
        window.location.href = "login.html"; // Redireciona para o login
    });

    // Chama a função para buscar usuários ao carregar a página
    fetchUsers();
});