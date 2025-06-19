function updateButtonText() {
    const subscriptionType = document.getElementById("subscription-type").value;
    const button = document.querySelector(".submit-btn");

    let price = 0;
    if (subscriptionType === "monthly") {
        price = 15;
    } else if (subscriptionType === "3months") {
        price = 35;
    } else if (subscriptionType === "6months") {
        price = 55;
    }

    button.textContent = `${price}$`;
}

document.getElementById("subscription-type").addEventListener("change", updateButtonText);

window.onload = updateButtonText;

document.getElementById("payment-form").addEventListener("submit", function(event) {
    event.preventDefault(); 

    const cardName = document.getElementById("card-name").value;
    const cardNumber = document.getElementById("card-number").value;
    const expiryDate = document.getElementById("expiry-date").value;
    const cvv = document.getElementById("cvv").value;
    const subscriptionType = document.getElementById("subscription-type").value;

    const status = document.getElementById("payment-status");
    status.innerHTML = "";

    let formValid = true;

    if (!cardName || !cardNumber || !expiryDate || !cvv) {
        status.innerHTML = "Please fill in all fields.";
        formValid = false;
    }

    if (cardNumber.length !== 16) {
        status.innerHTML = "The card number must consist of 16 digits.";
        formValid = false;
    }

    if (cvv.length !== 3) {
        status.innerHTML = "The CVV must contain 3 digits.";
        formValid = false;
    }

    if (!formValid) {
        document.querySelector(".payment-container").classList.add("shake");

        setTimeout(() => {
            document.querySelector(".payment-container").classList.remove("shake");
        }, 500); 
        return;
    }

    status.innerHTML = `Payment is successful!`;

    document.getElementById("payment-form").reset();
    updateButtonText();  
});
