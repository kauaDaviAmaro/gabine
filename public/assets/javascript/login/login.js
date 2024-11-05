document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    event.stopPropagation();
    
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("Password");

    if (emailInput.checkValidity() === false || passwordInput.checkValidity() === false) {
        this.classList.add("was-validated");
    } else {
        this.submit();
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('Password');
    
    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        this.querySelector('img').src = type === 'password' ? 'assets/imgs/login/olho.png' : 'assets/imgs/login/olhoCortado.png';
    });
});
