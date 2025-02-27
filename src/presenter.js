import { calculateNetPrice } from "./totalizador.js";

const quantityInput = document.querySelector("#label-quantity");
const priceInput = document.querySelector("#label-price");  
const form = document.querySelector("#form");
const resultDiv = document.querySelector("#result-div");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const quantity = Number.parseInt(quantityInput.value);
  const price = Number.parseInt(priceInput.value);

  try {
    const result = calculateNetPrice(quantity, price);
    resultDiv.innerHTML = `<p>Precio Neto: ${result}</p>`;
  } catch (error) {
    resultDiv.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
  }
});
