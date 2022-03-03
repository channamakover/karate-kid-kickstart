import testkitCreator from "./testkit"; 

const testkit = testkitCreator();
describe("test server",() => {

  testkit.beforeAndAfter();

  it("should", () => {
    expect(testkit.drivers().appdriver()).toBe("fail");
  });
});
