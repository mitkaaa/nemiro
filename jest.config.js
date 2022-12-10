module.exports = {
    testEnvironment: 'jsdom',
    transform: {
        '\\.js$': 'babel-jest',
    },
    preset: 'ts-jest',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts', 'jest-canvas-mock'],
}
