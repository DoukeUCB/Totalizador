import { calculateNetPrice, calculateTotalPrice, calculateDiscount, calculateTax, calculateAdditionalTax } from "./totalizador.js";

const quantityInput = document.querySelector("#label-quantity");
const priceInput = document.querySelector("#label-price");
const stateInput = document.querySelector("#label-state");
const categoryInput = document.querySelector("#label-category");
const form = document.querySelector("#form");
const resultDiv = document.querySelector("#result-div");

const handleFormSubmit = (event) => {
  event.preventDefault();

  const quantity = Number(quantityInput.value);
  const price = Number(priceInput.value);
  const state = stateInput.value;
  const category = categoryInput.value;

  try {
    const netPrice = calculateNetPrice(quantity, price);
    const discount = calculateDiscount(netPrice);
    const tax = calculateTax(netPrice - discount, state);
    const additionalTax = calculateAdditionalTax(netPrice - discount, category);
    const totalPrice = calculateTotalPrice(netPrice, state, category);

    document.querySelector("#result-quantity").textContent = quantity;
    document.querySelector("#result-price").textContent = price.toFixed(2);
    document.querySelector("#result-state").textContent = state;
    document.querySelector("#result-net-price").textContent = `${quantity} * $${price.toFixed(2)}: $${netPrice.toFixed(2)}`;
    document.querySelector("#result-discount").textContent = `${(discount / netPrice * 100).toFixed(2)}%: $${discount.toFixed(2)}`;
    document.querySelector("#result-tax").textContent = `${((tax + additionalTax) / (netPrice - discount) * 100).toFixed(2)}%: $${(tax + additionalTax).toFixed(2)}`;
    document.querySelector("#result-total-price").textContent = totalPrice.toFixed(2);
  } catch (error) {
    resultDiv.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
  }
};

form.addEventListener("submit", handleFormSubmit);