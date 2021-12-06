import { addOpacityToHex, hexToRGB } from ".";

describe("theme utils", () => {
  describe("hexToRGB", () => {
    test("converts a hex code to rgb", () => {
      expect(hexToRGB("000000")).toEqual({
        r: 0,
        g: 0,
        b: 0,
      });

      expect(hexToRGB("ffffff")).toEqual({
        r: 255,
        g: 255,
        b: 255,
      });
    });

    test("supports #", () => {
      expect(hexToRGB("#000000")).toEqual({
        r: 0,
        g: 0,
        b: 0,
      });
    });

    test("supports no #", () => {
      expect(hexToRGB("#000000")).toEqual({
        r: 0,
        g: 0,
        b: 0,
      });
    });

    test("supports shortened hex codes", () => {
      expect(hexToRGB("#000")).toEqual({
        r: 0,
        g: 0,
        b: 0,
      });

      expect(hexToRGB("#fff")).toEqual({
        r: 255,
        g: 255,
        b: 255,
      });
    });

    test("errors if invalid length", () => {
      expect(() => hexToRGB("#fafafafa")).toThrow();
      expect(() => hexToRGB("#fffa")).toThrow();
      expect(() => hexToRGB("fafa")).toThrow();
      expect(() => hexToRGB("fffffff")).toThrow();
    });

    test("errors if invalid hex code", () => {
      expect(() => hexToRGB("-10000")).toThrow();
      expect(() => hexToRGB("#-10000")).toThrow();
      expect(() => hexToRGB("gf0000")).toThrow();
    });
  });

  describe("addOpacityToHex", () => {
    test("create valid rgba string", () => {
      expect(addOpacityToHex("#fff", 0)).toBe("rgba(255, 255, 255, 0)");
      expect(addOpacityToHex("#000000", 1)).toBe("rgba(0, 0, 0, 1)");
    });
    test("accepts opacity between 0 and 1 (inclusive)", () => {
      expect(() => addOpacityToHex("#fff", 0)).not.toThrow();
      expect(() => addOpacityToHex("#fff", 0.5)).not.toThrow();
      expect(() => addOpacityToHex("#fff", 1)).not.toThrow();
    });
    test("does not support opacity below 0", () => {
      expect(() => addOpacityToHex("#fff", -1)).toThrow();
    });
    test("does not support opacity above 1", () => {
      expect(() => addOpacityToHex("#fff", 2)).toThrow();
    });
  });
});
