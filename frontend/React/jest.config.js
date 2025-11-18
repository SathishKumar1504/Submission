module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest"
  },
  coverageThreshold: {
    global: {
      branches: 10,
      functions: 20,
      lines: 20,
      statements: 20
    }
  },
  coveragePathIgnorePatterns: [
    "src/components/ThreeButtons/ThreeButtons.jsx"
  ]
};
