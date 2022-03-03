import testkitCreator from "./testkit"; 
import appDriver from "./app-driver";

const testkit = testkitCreator();
describe("test server",() => {

  testkit.beforeAndAfter();

  it("should", () => {
    expect(testkit.drivers().appdriver()).toBe("fail");
  });
});
