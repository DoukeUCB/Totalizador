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
    } else if (totalPrice >= 3000 && totalPrice < 7000) {
        return totalPrice * 0.05;
    } else if (totalPrice >= 7000 && totalPrice < 10000) {
        return totalPrice * 0.07;
    } else if (totalPrice >= 10000 && totalPrice < 30000) {
        return totalPrice * 0.10;
    } else {
        return 0;
    }
}

export function calculateTax(totalPrice, stateCode) {
    const taxRates = {
        "UT": 0.0665,
        "NV": 0.08,
        "TX": 0.0625,
        "AL": 0.04,
        "CA": 0.0825
    };

    const taxRate = taxRates[stateCode] || 0;
    return totalPrice * taxRate;
}

export function calculateAdditionalTax(totalPrice, category) {
    const additionalTaxRates = {
        "Alimentos": 0,
        "Bebidas alcohólicas": 0.07,
        "Material de escritorio": 0,
        "Muebles": 0.03,
        "Electrónicos": 0.04,
        "Vestimenta": 0.02,
        "Varios": 0
    };

    const additionalTaxRate = additionalTaxRates[category] || 0;
    return totalPrice * additionalTaxRate;
}

export function calculateAdditionalDiscount(totalPrice, category) {
    const additionalDiscountRates = {
        "Alimentos": 0.02,
        "Bebidas alcohólicas": 0,
        "Material de escritorio": 0.015,
        "Muebles": 0,
        "Electrónicos": 0.01,
        "Vestimenta": 0,
        "Varios": 0
    };

    const additionalDiscountRate = additionalDiscountRates[category] || 0;
    return totalPrice * additionalDiscountRate;
}

export function calculateShippingCost(weight) {
    if (weight <= 10) {
        return 0;
    } else if (weight <= 20) {
        return 3.5;
    } else if (weight <= 40) {
        return 5;
    } else if (weight <= 80) {
        return 6;
    } else if (weight <= 100) {
        return 6.5;
    } else if (weight <= 200) {
        return 8;
    } else {
        return 9;
    }
}

export function calculateShippingDiscount(shippingCost, clientType) {
    const shippingDiscountRates = {
        "Normal": 0,
        "Recurrente": 0.005,
        "Antiguo Recurrente": 0.01,
        "Especial": 0.015
    };

    const shippingDiscountRate = shippingDiscountRates[clientType] || 0;
    return shippingCost * shippingDiscountRate;
}

export function calculateTotalPrice(totalPrice, stateCode, category, weight, quantity, clientType) {
    const discount = calculateDiscount(totalPrice);
    const additionalDiscount = calculateAdditionalDiscount(totalPrice, category);
    const totalDiscount = discount + additionalDiscount;
    const priceAfterDiscount = totalPrice - totalDiscount;
    const tax = calculateTax(priceAfterDiscount, stateCode);
    const additionalTax = calculateAdditionalTax(priceAfterDiscount, category);
    const shippingCost = calculateShippingCost(weight) * quantity;
    const shippingDiscount = calculateShippingDiscount(shippingCost, clientType);
    const finalShippingCost = shippingCost - shippingDiscount;
    return parseFloat((priceAfterDiscount + tax + additionalTax + finalShippingCost).toFixed(2));
}
