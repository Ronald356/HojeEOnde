module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    // Transforma os módulos listados, mesmo que estejam em node_modules
    'node_modules/(?!(react-native|@react-native|@react-navigation|react-native-vector-icons)/)',
  ],
  setupFilesAfterEnv: [
    '@testing-library/jest-native/extend-expect',
  ],
};
