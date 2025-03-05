import { calculateNetPrice, calculateTotalPrice, calculateDiscount, calculateTax } from "./totalizador.js";

// Seleccionar elementos del DOM
const quantityInput = document.querySelector("#label-quantity");
const priceInput = document.querySelector("#label-price");
const stateInput = document.querySelector("#label-state");
const form = document.querySelector("#form");
const resultDiv = document.querySelector("#result-div");

// Función para generar el HTML de la tabla de resultados
const generateResultTable = (quantity, price, state, netPrice, discount, tax, totalPrice) => {
  return `
    <table>
      <thead>
        <tr>
          <td rowspan="3"><b>Cantidad de ítem:</b></td>
          <td><b>${quantity}</b></td>
          <td rowspan="3"></td>
        </tr>
        <tr>
          <td><b>Precio por ítem:</b></td>
          <td><b>${price.toFixed(2)}</b></td>
        </tr>
        <tr>
          <td><b>Código de estado:</b></td>
          <td><b>${state}</b></td>
        </tr>
        <tr>
          <td colspan="3"><b>Totalizar</b></td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colspan="3">Precio neto (${quantity} * $${price.toFixed(2)}): $${netPrice.toFixed(2)}</td>
        </tr>
        <tr>
          <td colspan="3">Descuento (${(discount / netPrice * 100).toFixed(2)}%): $${discount.toFixed(2)}</td>
        </tr>
        <tr>
          <td colspan="3">Impuesto para ${state} (${(calculateTax(1, state) * 100)}%): $${tax.toFixed(2)}</td>
        </tr>
        <tr>
          <td colspan="3">Precio total (descuento e impuesto): $${totalPrice.toFixed(2)}</td>
        </tr>
      </tbody>
    </table>
  `;
};

// Función para manejar el evento submit del formulario
const handleFormSubmit = (event) => {
  event.preventDefault();

  // Obtener los valores de los inputs
  const quantity = Number(quantityInput.value);
  const price = Number(priceInput.value);
  const state = stateInput.value;

  try {
    // Calcular el precio neto
    const netPrice = calculateNetPrice(quantity, price);

    // Calcular el descuento
    const discount = calculateDiscount(netPrice);

    // Calcular el impuesto
    const tax = calculateTax(netPrice - discount, state);

    // Calcular el precio total
    const totalPrice = calculateTotalPrice(netPrice, state);

    // Generar y mostrar la tabla de resultados
    resultDiv.innerHTML = generateResultTable(quantity, price, state, netPrice, discount, tax, totalPrice);
  } catch (error) {
    // Mostrar un mensaje de error si algo falla
    resultDiv.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
  }
};

// Escuchar el evento submit del formulario
form.addEventListener("submit", handleFormSubmit);