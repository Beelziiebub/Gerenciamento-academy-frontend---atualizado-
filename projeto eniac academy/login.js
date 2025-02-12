document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");
    const logoutButton = document.getElementById("logout");
    const message = document.getElementById("message");

    const loginDiv = document.getElementById("login");
    const dashboardDiv = document.getElementById("dashboard");
    const registerDiv = document.getElementById("registerContainer");
    const resetDiv = document.getElementById("resetContainer");
    const homeDiv = document.getElementById("home");
    const retornarHomeDiv = document.getElementById("retornarHome");

    // Verifica se já está logado
    const token = localStorage.getItem("token");
    if (token) {
        showDashboard();
    }

    // LOGIN
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            const users = JSON.parse(localStorage.getItem("users")) || [];

            const user = users.find(user => user.email === email && user.password === password);

            if (user) {
                grecaptcha.ready(function() {
                    grecaptcha.execute('SEU_SITE_KEY', {action: 'login'}).then(function(token) {
                        localStorage.setItem("token", email);
                        showDashboard();
                    });
                });
            } else {
                message.textContent = "Email ou senha inválidos.";
                message.style.color = "red";
            }
        });
    }

    // LOGOUT
    if (logoutButton) {
        logoutButton.addEventListener("click", function () {
            localStorage.removeItem("token");
            showLogin();
        });
    }

    // MOSTRAR HOME
    window.showHome = function () {
        loginDiv.style.display = "none";
        dashboardDiv.style.display = "none";
        registerDiv.style.display = "none";
        resetDiv.style.display = "none";
        homeDiv.style.display = "block";
        retornarHomeDiv.style.display = "none";
    };

    // MOSTRAR LOGIN
    window.showLogin = function () {
        loginDiv.style.display = "block";
        dashboardDiv.style.display = "none";
        registerDiv.style.display = "none";
        resetDiv.style.display = "none";
        homeDiv.style.display = "none";
        retornarHomeDiv.style.display = "block";
    };

    // MOSTRAR DASHBOARD
    function showDashboard() {
        loginDiv.style.display = "none";
        dashboardDiv.style.display = "block";
        registerDiv.style.display = "none";
        resetDiv.style.display = "none";
        homeDiv.style.display = "none";
        retornarHomeDiv.style.display = "block";
    }

    // MOSTRAR CADASTRO
    window.showRegister = function () {
        loginDiv.style.display = "none";
        dashboardDiv.style.display = "none";
        registerDiv.style.display = "block";
        resetDiv.style.display = "none";
        homeDiv.style.display = "none";
        retornarHomeDiv.style.display = "block";
        document.getElementById("registerMessage").textContent = "";
    };

    // MOSTRAR REDEFINIR SENHA
    window.showReset = function () {
        loginDiv.style.display = "none";
        dashboardDiv.style.display = "none";
        registerDiv.style.display = "none";
        resetDiv.style.display = "block";
        homeDiv.style.display = "none";
        retornarHomeDiv.style.display = "block";
        document.getElementById("resetMessage").textContent = "";
    };

    // FUNÇÃO PARA VOLTAR AO HOME
    window.retornarHome = function () {
        showHome();
    };

    // FUNÇÃO DE REDEFINIÇÃO DE SENHA
    window.resetPassword = function () {
        const email = document.getElementById("resetEmail").value;
        const users = JSON.parse(localStorage.getItem("users")) || [];

        const user = users.find(user => user.email === email);

        if (user) {
            document.getElementById("resetMessage").textContent = "Verifique seu email para redefinir a senha.";
            document.getElementById("resetMessage").style.color = "green";
        } else {
            document.getElementById("resetMessage").textContent = "Email não encontrado.";
            document.getElementById("resetMessage").style.color = "red";
        }
    };

    // FUNÇÃO DE CADASTRO (Registra usuários no localStorage)
    if (registerForm) {
        registerForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const email = document.getElementById("registerEmail").value;
            const password = document.getElementById("registerPassword").value;
            const termsCheckbox = document.getElementById("termsCheckbox");
            const users = JSON.parse(localStorage.getItem("users")) || [];

            if (!termsCheckbox.checked) {
                document.getElementById("registerMessage").textContent = "Você deve aceitar os termos e condições.";
                document.getElementById("registerMessage").style.color = "red";
                return;
            }

            if (users.find(user => user.email === email)) {
                document.getElementById("registerMessage").textContent = "Erro no Cadastro, tente novamente.";
                document.getElementById("registerMessage").style.color = "red";
            } else {
                users.push({ email, password });
                localStorage.setItem("users", JSON.stringify(users));
                document.getElementById("registerMessage").textContent = "Cadastro realizado com sucesso!";
                document.getElementById("registerMessage").style.color = "green";
            }
        });
    }
});
