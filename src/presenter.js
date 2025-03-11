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

    document.querySelector("#result-quantity").textContent = quantity;
    document.querySelector("#result-price").textContent = price.toFixed(2);
    document.querySelector("#result-state").textContent = state;
    document.querySelector("#result-net-price").textContent = `${quantity} * $${price.toFixed(2)}: $${netPrice.toFixed(2)}`;
    document.querySelector("#result-discount").textContent = `${(totalDiscount / netPrice * 100).toFixed(2)}%: $${totalDiscount.toFixed(2)}`;
    document.querySelector("#result-tax").textContent = `${((tax + additionalTax) / (netPrice - totalDiscount - fixedDiscount) * 100).toFixed(2)}%: $${(tax + additionalTax).toFixed(2)}`;
    document.querySelector("#result-total-price").textContent = `${totalPrice.toFixed(2)} (incluye costo de envío: $${(shippingCost - shippingDiscount).toFixed(2)}, descuento fijo: $${fixedDiscount.toFixed(2)})`;
  } catch (error) {
    resultDiv.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
  }
};

form.addEventListener("submit", handleFormSubmit);