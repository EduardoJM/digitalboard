const { name } = require('./package.json');

module.exports = {
    displayName: name,
    name,
    clearMocks: true,
    preset: 'ts-jest',
    globalSetup: "<rootDir>/test/globalSetup.ts",
    globalTeardown: "<rootDir>/test/globalTeardown.ts",
    setupFilesAfterEnv: [
        '<rootDir>/test/setupTests.ts'
    ],
};