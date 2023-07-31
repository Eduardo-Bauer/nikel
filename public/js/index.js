const myModal = new bootstrap.Modal("#register-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

checklogged();

//logar no sistema
document.getElementById("login-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("email-input").value;
    const password = document.getElementById("password-input").value;
    const session = document.getElementById("session-check").checked;

    const account = getAccount(email);

    if(!account) {
        alert("Email ou senha invalido.");
        return;
    }

    if(account) {
        if(account.password !== password) {
            alert("Email ou senha invalido.");
            return;
        }

        saveSession(email, session);
        
        window.location.href = "home.html";
    }
});
 
//Criar conta
document.getElementById("create-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("email-create-input").value;
    const password = document.getElementById("password-create-input").value;

    if(email.length <15) {
        alert("Preencha o campo com um e-mail válido.")
        return;
    }

    if(password.length < 6) {
        alert("A senha deverá ter no minimo 6 digitos.")
        return;
    }

    saveAccount({
        login: email,
        password: password,
        transactions: []
    });
    
    myModal.hide();

    alert("Conta criada com sucesso.");
});

function checklogged() {
    if(session) {
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if(logged) {
        saveSession(logged, session);

        window.location.href = "home.html";
    }
}

function saveAccount(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
}

function saveSession(data, saveSession) {
    if(saveSession) {
        localStorage.setItem("session", data);
    }

    sessionStorage.setItem("logged", data);
}

function getAccount(key) {
    const account = localStorage.getItem(key);

    if(account) {
        return JSON.parse(account);
    }

    return "";
}

