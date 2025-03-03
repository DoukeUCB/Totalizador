import { calculateNetPrice, calculateDiscount,calculateTax} from "./totalizador.js";

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
    expect(calculateTax(1000, "NV")).toBe(80);
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