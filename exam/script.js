const exchangeRates = {
    uah: { usd: 0.024, eur: 0.023 },
    usd: { uah: 41.65, eur: 0.95 },
    eur: { uah: 43.70, usd: 1.05 }
};
const firstCurr = document.getElementById('first_curr');
const secondCurr = document.getElementById('second_curr');
const input = document.getElementById('num');
const result = document.getElementById('result');
function updateOptions() {
    const firstValue = firstCurr.value;
    const secondValue = secondCurr.value;
    for (let option of secondCurr.options) {
        option.disabled = option.value === firstValue;
    }
    for (let option of firstCurr.options) {
        option.disabled = option.value === secondValue;
    }
}
function calculate() {
    const firstValue = firstCurr.value;
    const secondValue = secondCurr.value;
    const amount = parseFloat(input.value) || 0;
    const rate = exchangeRates[firstValue]?.[secondValue] || 0;
    result.textContent = (amount * rate).toFixed(2);
}
firstCurr.addEventListener('change', () => {
    updateOptions();
    calculate();
});
secondCurr.addEventListener('change', () => {
    updateOptions();
    calculate();
});
input.addEventListener('input', calculate);
updateOptions();