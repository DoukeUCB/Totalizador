export function calculateNetPrice(quantityInput, priceInput) {
    quantityValidator(quantityInput)
    priceValidator(priceInput)
    return quantityInput * priceInput;
}

function priceValidator(price) {
    if (price <= 0) {
        throw new Error("El precio debe ser mayor a 0.");
    }else if (isNaN(price)){
        throw new Error("El precio no puede estar vacio.");
    }
    return price;
}

function quantityValidator(quantity) {
    if (quantity <= 0) {
        throw new Error("El precio debe ser mayor a 0.");
    }else if (isNaN(quantity)){
        throw new Error("El precio no puede estar vacio.");
    }
    return quantity ;
}

