document.addEventListener("DOMContentLoaded", function() {
    const amountInput = document.getElementById("amountInput");
    const fromCurrency = document.getElementById("fromCurrency");
    const toCurrency = document.getElementById("toCurrency");
    const convertButton = document.getElementById("convertButton");
    const result = document.getElementById("result");

    // Fetch currency rates from an API
    function fetchCurrencyRates() {
        const API_KEY = 'c82f9511c16a006211d997db'; // Replace with your API key
        const BASE_URL = 'https://api.exchangerate-api.com/v4/latest/USD'; // Base currency is USD
        const apiUrl = `${BASE_URL}?apikey=${API_KEY}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                populateCurrencyOptions(data);
            })
            .catch(error => console.error("Error fetching currency rates:", error));
    }

    // Populate currency dropdowns with options
    function populateCurrencyOptions(data) {
        const currencies = Object.keys(data.rates);
        currencies.forEach(currency => {
            const option1 = document.createElement('option');
            option1.text = currency;
            option1.value = currency;
            const option2 = option1.cloneNode(true);
            fromCurrency.appendChild(option1);
            toCurrency.appendChild(option2);
        });
    }

    // Convert currency
    function convertCurrency() {
        const amount = amountInput.value;
        const from = fromCurrency.value;
        const to = toCurrency.value;

        fetch(`https://api.exchangerate-api.com/v4/latest/${from}`)
            .then(response => response.json())
            .then(data => {
                const exchangeRate = data.rates[to];
                const convertedAmount = (amount * exchangeRate).toFixed(2);
                result.textContent = `${amount} ${from} = ${convertedAmount} ${to}`;
            })
            .catch(error => console.error("Error converting currency:", error));
    }

    // Event listeners
    convertButton.addEventListener("click", convertCurrency);

    // Initialize
    fetchCurrencyRates();
});
