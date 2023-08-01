import { MD3LightTheme as DefaultTheme, useTheme } from 'react-native-paper';

declare global {
  namespace ReactNativePaper {
    interface ThemeColors {
      red: string;
      blue: string;
      green: string;
      darkBlue: string;
    }
  }
}

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    red: '#EE6258',
    blue: '#A6D4F2',
    green: 'green',
    darkBlue: '#508AA8',
  },
};

type AppTheme = typeof theme;

export const useAppTheme = (): AppTheme => useTheme<AppTheme>();
