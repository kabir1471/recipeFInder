jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

jest.mock('@react-native-community/netinfo', () => ({
  addEventListener: jest.fn(() => ({ remove: jest.fn() })),
  fetch: jest.fn(() => Promise.resolve({ isConnected: true })),
}));

jest.mock('@react-native-vector-icons/ionicons', () => 'Ionicons');
jest.mock('@react-native-vector-icons/material-design-icons', () => 'MaterialDesignIcons');

jest.mock('react-native-safe-area-context', () => {
  const React = require('react');
  const defaultInsets = { top: 0, right: 0, bottom: 0, left: 0 };
  const InsetsContext = React.createContext(defaultInsets);

  const MockProvider = ({ children }) =>
    React.createElement(
      InsetsContext.Provider,
      {
        value: defaultInsets,
      },
      children,
    );

  return {
    __esModule: true,
    SafeAreaProvider: MockProvider,
    SafeAreaView: MockProvider,
    SafeAreaInsetsContext: InsetsContext,
    useSafeAreaInsets: () => defaultInsets,
    useSafeAreaFrame: () => ({ x: 0, y: 0, width: 0, height: 0 }),
  };
});
