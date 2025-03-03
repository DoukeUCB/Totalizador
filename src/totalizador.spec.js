import { calculateNetPrice, calculateDiscount} from "./totalizador.js";

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

});
