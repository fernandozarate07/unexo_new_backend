import { createDefaultPreset } from "ts-jest";

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} */
export default {
  preset: "ts-jest",
  transform: {
    ...tsJestTransformCfg,
  },
  testEnvironment: "node",
  setupFiles: ["<rootDir>/src/config/testGuard.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  roots: ["<rootDir>/src"],
  testMatch: ["**/?(*.)+(spec|test|integration.test).[jt]s?(x)"],
};
