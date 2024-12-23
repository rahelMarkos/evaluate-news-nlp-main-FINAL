const { sendToServer } = require("../client/js/formHandler");

describe("send to server function is defined", () => {
  test("the function is defined", () => {
    expect(sendToServer).toBeDefined();
  });
});
