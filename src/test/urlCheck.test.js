const { URLchecker } = require("../client/js/urlchecker")(
  "THE function is defined ",
  () => {
    test("It validates URLs correctly", () => {
      expect(URLchecker).toBeDefined();
    });

    test("it returns true for valid URLs  ", () => {
      expect(URLchecker("https://www.wxample.com")).toBe(true);
      expect(URLchecker("http://www.example.com")).toBe(true);
      expect(URLchecker("https://www.wxample.com/articles?sort=desc")).toBe(
        true
      );
      expect(URLchecker("https://subdomain.example.com")).toBe(true);
      expect(URLchecker("https://example.com:8080")).toBe(true);
      expect(URLchecker("ftp://example.com")).toBe(true);
      expect(URLchecker("https://example.com/#section")).toBe(true);
      expect(URLchecker("https://example.com?param=value")).toBe(true);
    });
    test("it returns false for valid URLs   ", () => {
      expect(URLchecker("Hello")).toBe(false);
      expect(URLchecker("invalid-url")).toBe(false);
      expect(URLchecker("Hello///www.example.com")).toBe(false);
      expect(URLchecker("/xample.com/articles?sort=desc")).toBe(false);
      expect(URLchecker("http://.com")).toBe(false);
      expect(URLchecker("https://")).toBe(false);
      expect(URLchecker("https:// example.com")).toBe(false); // URL with space
      expect(URLchecker("https:/example.com")).toBe(false); // Missing second slash
      expect(URLchecker("://example.com")).toBe(false);
    });
  }
);
