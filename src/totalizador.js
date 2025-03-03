export function calculateNetPrice(quantityInput, priceInput) {
    quantityValidator(quantityInput);
    priceValidator(priceInput);
    return quantityInput * priceInput;
}

function priceValidator(price) {
    if (price === null || price === undefined || price === "") {
        throw new Error("El precio no puede estar vacío.");
    }
    if (isNaN(price) || Number.isNaN(Number(price))) {
        throw new Error("El precio debe ser un número válido.");
    }
    if (price <= 0) {
        throw new Error("El precio debe ser mayor a 0.");
    }
    return price;
}

function quantityValidator(quantity) {
    if (quantity === null || quantity === undefined || quantity === "") {
        throw new Error("La cantidad no puede estar vacía.");
    }
    if (isNaN(quantity) || Number.isNaN(Number(quantity))) {
        throw new Error("La cantidad debe ser un número válido.");
    }
    if (quantity <= 0) {
        throw new Error("La cantidad debe ser mayor a 0.");
    }
    return quantity;
}
export function calculateDiscount(totalPrice) {
    if (totalPrice >= 1000 && totalPrice < 3000) {
        return totalPrice * 0.03;
    }
}