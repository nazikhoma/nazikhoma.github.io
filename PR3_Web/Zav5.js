function replaceDates() {
    let inputText = document.getElementById('input').value;
    let errorDiv = document.getElementById('error');
    let outputDiv = document.getElementById('output');
    errorDiv.innerText = '';
    outputDiv.innerText = '';
    let datePattern = /(\d{2})\/(\d{2})\/(\d{4})/g;
    let hasError = false;
    let foundDate = false;
    let formattedText = inputText.replace(datePattern, (match, day, month, year) => {
        foundDate = true;
        day = parseInt(day, 10);
        month = parseInt(month, 10);
        year = parseInt(year, 10);
        if (day < 1 || day > 31 || month < 1 || month > 12 || year < 1000 || year > 9999) {
            hasError = true;
            return match;
        }
        return `${year}-${month}-${day}`;
    });
    if (!foundDate) {
        alert("У тексті немає дат у форматі DD/MM/YYYY!");
        return;
    }
    if (hasError) {
        alert("Одна або більше дат мають неправильний формат!");
    } else {
        outputDiv.innerText = formattedText;
    }
}