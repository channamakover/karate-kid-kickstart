module.exports = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["./src/tests/setupJest"],
    moduleNameMapper: {
        "\\.(css|less)$": "identity-obj-proxy"
      }
};