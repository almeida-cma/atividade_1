function saveEmail() {
    const emailInput = document.getElementById('email');
    const email = emailInput.value;

    fetch('/saveEmail', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `email=${email}`,
    })
    .then(response => response.text())
    .then(message => {
        alert(message);
        // Limpar o campo de e-mail após o sucesso
        emailInput.value = '';
    })
    .catch(error => console.error('Erro:', error));
}