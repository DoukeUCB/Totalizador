import { calculateNetPrice } from "./totalizador.js";

describe("Calcular el precio neto", () => {
  it("Deberia retornar la cantidad por el precio", () => {
    expect(calculateNetPrice(3, 2)).toBe(6);
  });

  it("Deberia retornar el error", () => {
    expect(() => calculateNetPrice(-3, 5)).toThrow(Error);
    expect(() => calculateNetPrice(3, NaN)).toThrow(Error);
  });
});

