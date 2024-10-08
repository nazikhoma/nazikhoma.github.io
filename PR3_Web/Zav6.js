function extractEmails() {
    let inputText = document.getElementById('input').value;
    let outputDiv = document.getElementById('output');
    outputDiv.innerText = '';
    let emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}/g;
    let foundEmails = inputText.match(emailPattern) || [];
    if (foundEmails.length > 0) {
        outputDiv.innerText = '[' + foundEmails.map(email => `"${email}"`).join(', ') + ']';
    } else {
        outputDiv.innerText = "Не знайдено жодної електронної адреси.";
    }
}