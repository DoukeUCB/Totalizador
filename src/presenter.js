import { calculateNetPrice, calculateTotalPrice, calculateDiscount, calculateTax, calculateAdditionalTax, calculateAdditionalDiscount, calculateShippingCost, calculateShippingDiscount, calculateFixedDiscount } from "./totalizador.js";

const quantityInput = document.querySelector("#label-quantity");
const priceInput = document.querySelector("#label-price");
const stateInput = document.querySelector("#label-state");
const categoryInput = document.querySelector("#label-category");
const weightInput = document.querySelector("#label-weight");
const clientTypeInput = document.querySelector("#label-client-type");
const form = document.querySelector("#form");
const resultDiv = document.querySelector("#result-div");

const handleFormSubmit = (event) => {
  event.preventDefault();

  const quantity = Number(quantityInput.value);
  const price = Number(priceInput.value);
  const state = stateInput.value;
  const category = categoryInput.value;
  const weight = Number(weightInput.value);
  const clientType = clientTypeInput.value;

  try {
    if (isNaN(quantity) || quantity <= 0) throw new Error("La cantidad debe ser un número válido y mayor a 0.");
    if (isNaN(price) || price <= 0) throw new Error("El precio debe ser un número válido y mayor a 0.");
    if (isNaN(weight) || weight <= 0) throw new Error("El peso volumétrico debe ser un número válido y mayor a 0.");

    const netPrice = calculateNetPrice(quantity, price);
    const discount = calculateDiscount(netPrice);
    const additionalDiscount = calculateAdditionalDiscount(netPrice, category);
    const totalDiscount = discount + additionalDiscount;
    const fixedDiscount = calculateFixedDiscount(netPrice - totalDiscount, clientType, category);
    const tax = calculateTax(netPrice - totalDiscount - fixedDiscount, state);
    const additionalTax = calculateAdditionalTax(netPrice - totalDiscount - fixedDiscount, category);
    const shippingCost = calculateShippingCost(weight) * quantity;
    const shippingDiscount = calculateShippingDiscount(shippingCost, clientType);
    const totalPrice = calculateTotalPrice(netPrice, state, category, weight, quantity, clientType);

    const resultQuantity = document.querySelector("#result-quantity");
    const resultPrice = document.querySelector("#result-price");
    const resultState = document.querySelector("#result-state");
    const resultNetPrice = document.querySelector("#result-net-price");
    const resultDiscount = document.querySelector("#result-discount");
    const resultTax = document.querySelector("#result-tax");
    const resultTotalPrice = document.querySelector("#result-total-price");

    if (!resultQuantity || !resultPrice || !resultState || !resultNetPrice || !resultDiscount || !resultTax || !resultTotalPrice) {
      throw new Error("No se pudieron encontrar todos los elementos de resultado en el DOM.");
    }

    resultQuantity.textContent = quantity;
    resultPrice.textContent = price.toFixed(2);
    resultState.textContent = state;
    resultNetPrice.textContent = `${quantity} * $${price.toFixed(2)}: $${netPrice.toFixed(2)}`;
    resultDiscount.textContent = `${(totalDiscount / netPrice * 100).toFixed(2)}%: $${totalDiscount.toFixed(2)}`;
    resultTax.textContent = `${((tax + additionalTax) / (netPrice - totalDiscount - fixedDiscount) * 100).toFixed(2)}%: $${(tax + additionalTax).toFixed(2)}`;
    resultTotalPrice.textContent = `${totalPrice.toFixed(2)} (incluye costo de envío: $${(shippingCost - shippingDiscount).toFixed(2)}, descuento fijo: $${fixedDiscount.toFixed(2)})`;
  } catch (error) {
    resultDiv.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
  }
};

form.addEventListener("submit", handleFormSubmit);