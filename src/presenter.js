import { calculateNetPrice, calculateTotalPrice, calculateDiscount, calculateTax } from "./totalizador.js";

const quantityInput = document.querySelector("#label-quantity");
const priceInput = document.querySelector("#label-price");
const stateInput = document.querySelector("#label-state");
const form = document.querySelector("#form");
const resultDiv = document.querySelector("#result-div");

const handleFormSubmit = (event) => {
  event.preventDefault();

  const quantity = Number(quantityInput.value);
  const price = Number(priceInput.value);
  const state = stateInput.value;

  try {
    const netPrice = calculateNetPrice(quantity, price);
    const discount = calculateDiscount(netPrice);
    const tax = calculateTax(netPrice - discount, state);
    const totalPrice = calculateTotalPrice(netPrice, state);

    document.querySelector("#result-quantity").textContent = quantity;
    document.querySelector("#result-price").textContent = price.toFixed(2);
    document.querySelector("#result-state").textContent = state;
    document.querySelector("#result-net-price").textContent = `${quantity} * $${price.toFixed(2)}: $${netPrice.toFixed(2)}`;
    document.querySelector("#result-discount").textContent = `${(discount / netPrice * 100).toFixed(2)}%: $${discount.toFixed(2)}`;
    document.querySelector("#result-tax").textContent = `${(calculateTax(1, state) * 100).toFixed(2)}%: $${tax.toFixed(2)}`;
    document.querySelector("#result-total-price").textContent = `${totalPrice.toFixed(2)}`;
  } catch (error) {
    resultDiv.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
  }
};

form.addEventListener("submit", handleFormSubmit);