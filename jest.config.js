const expoPreset = require('jest-expo/jest-preset');

module.exports = {
  coverageDirectory: 'coverage',
  preset: 'react-native',
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|@sentry/.*|@codler/react-native-keyboard-aware-scroll-view|@expo/vector-icons/.*)',
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  setupFiles: [...expoPreset.setupFiles],
  clearMocks: true,
};
