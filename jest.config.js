const expoPreset = require('jest-expo/jest-preset');

module.exports = {
  coverageDirectory: 'coverage',
  preset: 'react-native',
  transformIgnorePatterns: [
    // 'node_modules/(?!(jest-)?react-native|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|@sentry/.*|native-base|@expo)',
    'node_modules/(?!(@expo|react-native|native-base-shoutem-theme|react-native-easy-grid|react-native-drawer|react-native-vector-icons|@codler|react-native-iphone-x-helper)/)',
  ],
  modulePathIgnorePatterns: ['./node_modules/'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  setupFiles: [...expoPreset.setupFiles],
  clearMocks: true,
  modulePaths: ['<rootDir>'],
};
