import { calculateNetPrice, calculateDiscount, calculateTax, calculateTotalPrice, calculateAdditionalTax, calculateAdditionalDiscount, calculateShippingCost, calculateShippingDiscount } from "./totalizador.js";

describe("Calcular el precio neto", () => {
  it("Deberia retornar la cantidad por el precio", () => {
    expect(calculateNetPrice(3, 2)).toBe(6);
  });
  it("Deberia retornar el error", () => {
    expect(() => calculateNetPrice(-3, 5)).toThrow(Error);
    expect(() => calculateNetPrice(3, NaN)).toThrow(Error);
  });
  it("Debería lanzar un error si el precio es menor o igual a 0", () => {
    expect(() => calculateNetPrice(3, -5)).toThrow("El precio debe ser mayor a 0.");
    expect(() => calculateNetPrice(3, 0)).toThrow("El precio debe ser mayor a 0.");
  });
  it("Debería lanzar un error si la cantidad no es un número", () => {
    expect(() => calculateNetPrice("abc", 5)).toThrow("La cantidad debe ser un número válido.");
    expect(() => calculateNetPrice(null, 5)).toThrow("La cantidad no puede estar vacía.");
  });
  it("Debería lanzar un error si el precio no es un número", () => {
    expect(() => calculateNetPrice(3, "abc")).toThrow("El precio debe ser un número válido.");
    expect(() => calculateNetPrice(3, null)).toThrow("El precio no puede estar vacío.");
  });
});

describe("Calcular el descuento", () => {
  it("Debería retornar el descuento correcto para un precio total de 1000", () => {
    expect(calculateDiscount(1000)).toBe(30); 
  });
  it("Debería retornar el descuento correcto para un precio total de 3000", () => {
    expect(calculateDiscount(3000)).toBe(150); 
  });
  it("Debería retornar el descuento correcto para un precio total de 7000", () => {
    expect(calculateDiscount(7000)).toBeCloseTo(490, 2); 
  });
  it("Debería retornar el descuento correcto para un precio total de 10000", () => {
    expect(calculateDiscount(10000)).toBeCloseTo(1000); 
  });
  it("Debería retornar 0 si el precio total es menor a 1000", () => {
    expect(calculateDiscount(500)).toBe(0);
  });
});

describe("Calcular el impuesto", () => {
  it("Debería retornar el impuesto correcto para el estado UT", () => {
    expect(calculateTax(1000, "UT")).toBe(66.5); 
  });
  it("Debería retornar el impuesto correcto para el estado NV", () => {
    expect(calculateTax(1000, "NV")). toBe(80);
  });
  it("Debería retornar el impuesto correcto para el estado TX", () => {
    expect(calculateTax(1000, "TX")).toBe(62.5);
  });
  it("Debería retornar el impuesto correcto para el estado AL", () => {
    expect(calculateTax(1000, "AL")).toBe(40);
  });
  it("Debería retornar el impuesto correcto para el estado CA", () => {
    expect(calculateTax(1000, "CA")).toBe(82.5);
  });
  it("Debería retornar 0 si el estado no está en la lista", () => {
    expect(calculateTax(1000, "XX")).toBe(0);
  });
});

describe("Calcular el impuesto adicional por categoría", () => {
  it("Debería retornar el impuesto adicional correcto para la categoría Alimentos", () => {
    expect(calculateAdditionalTax(1000, "Alimentos")).toBe(0);
  });
  it("Debería retornar el impuesto adicional correcto para la categoría Bebidas alcohólicas", () => {
    expect(calculateAdditionalTax(1000, "Bebidas alcohólicas")).toBe(70);
  });
  it("Debería retornar el impuesto adicional correcto para la categoría Material de escritorio", () => {
    expect(calculateAdditionalTax(1000, "Material de escritorio")).toBe(0);
  });
});

describe("Calcular el descuento adicional por categoría", () => {
  it("Debería retornar el descuento adicional correcto para la categoría Alimentos", () => {
    expect(calculateAdditionalDiscount(1000, "Alimentos")).toBe(20);
  });
  it("Debería retornar el descuento adicional correcto para la categoría Material de escritorio", () => {
    expect(calculateAdditionalDiscount(1000, "Material de escritorio")).toBe(15);
  });
  it("Debería retornar el descuento adicional correcto para la categoría Electrónicos", () => {
    expect(calculateAdditionalDiscount(1000, "Electrónicos")).toBe(10);
  });
});

describe("Calcular el costo de envío", () => {
  it("Debería retornar el costo de envío correcto para un peso volumétrico de 5", () => {
    expect(calculateShippingCost(5)).toBe(0);
  });
  it("Debería retornar el costo de envío correcto para un peso volumétrico de 15", () => {
    expect(calculateShippingCost(15)).toBe(3.5);
  });
  it("Debería retornar el costo de envío correcto para un peso volumétrico de 25", () => {
    expect(calculateShippingCost(25)).toBe(5);
  });
});

describe("Calcular el precio total final con costo de envío y descuentos adicionales", () => {
  it("Debería retornar el precio total final correcto para un peso volumétrico de 5, categoría Alimentos y estado UT", () => {
    expect(calculateTotalPrice(1000, "UT", "Alimentos", 5, 10)).toBeCloseTo(1013.17, 2);
  });
  it("Debería retornar el precio total final correcto para un peso volumétrico de 25, categoría Bebidas alcohólicas y estado CA", () => {
    expect(calculateTotalPrice(1000, "CA", "Bebidas alcohólicas", 25, 10)).toBeCloseTo(1167.93, 2);
  });
  it("Debería retornar el precio total final correcto para un peso volumétrico de 50, categoría Electrónicos y estado TX", () => {
    expect(calculateTotalPrice(1000, "TX", "Electrónicos", 50, 10)).toBeCloseTo(1118.4, 2);
  });
});

describe("Calcular el descuento en el costo de envío por tipo de cliente", () => {
  it("Debería retornar el descuento correcto para un cliente Recurrente", () => {
    expect(calculateShippingDiscount(100, "Recurrente")).toBe(0.5);
  });
  it("Debería retornar el descuento correcto para un cliente Antiguo Recurrente", () => {
    expect(calculateShippingDiscount(100, "Antiguo Recurrente")).toBe(1);
  });
  it("Debería retornar el descuento correcto para un cliente Especial", () => {
    expect(calculateShippingDiscount(100, "Especial")).toBe(1.5);
  });
});

describe("Calcular el precio total final con costo de envío, descuentos adicionales y tipo de cliente", () => {
  it("Debería retornar el precio total final correcto para un peso volumétrico de 25, categoría Bebidas alcohólicas, estado CA y cliente Antiguo Recurrente", () => {
    expect(calculateTotalPrice(1000, "CA", "Bebidas alcohólicas", 25, 10, "Antiguo Recurrente")).toBeCloseTo(1167.43, 2);
  });
});