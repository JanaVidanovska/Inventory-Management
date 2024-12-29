import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom', // Use jsdom for React component testing
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testMatch: [
    '<rootDir>/src/**/*.(test|spec).(ts|tsx)',  // Matches files ending with .test.ts or .spec.ts in the src directory
  ],
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/.stryker-tmp/'], // Ignore specific folders
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'], // Recognized file extensions
};
export default config;
