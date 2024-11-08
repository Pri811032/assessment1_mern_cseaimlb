// Replace 'YOUR_API_KEY' with your actual API key
const API_KEY = 'https://api.exchangerate-api.com/v4/latest/USD';
const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/`;

async function convertCurrency() {
    const amount = document.getElementById("amount").value;
    const fromCurrency = document.getElementById("fromCurrency").value;
    const toCurrency = document.getElementById("toCurrency").value;

    if (!amount) {
        alert("Please enter an amount to convert.");
        return;
    }

    try {
        // Fetch conversion rates for the selected base currency
        const response = await fetch(`${API_URL}${fromCurrency}`);
        if (!response.ok) throw new Error('Error fetching exchange rate data.');

        const data = await response.json();
        const rate = data.conversion_rates[toCurrency];
        
        if (!rate) {
            alert(`Conversion rate for ${fromCurrency} to ${toCurrency} is not available.`);
            return;
        }

        // Perform the conversion
        const result = (amount * rate).toFixed(2);
        document.getElementById("result").innerText = `Converted Amount: ${result} ${toCurrency}`;
    } catch (error) {
        console.error("Error fetching data:", error);
        alert("Failed to fetch conversion rate. Please try again later.");
    }
}
