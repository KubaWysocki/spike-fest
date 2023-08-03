import { MD3LightTheme as DefaultTheme, useTheme } from 'react-native-paper';

declare global {
  namespace ReactNativePaper {
    interface ThemeColors {
      red: string;
      blue: string;
      darkBlue: string;
    }
  }
}

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    onSurface: '#011627',
    red: '#EE6258',
    blue: '#A6D4F2',
    darkBlue: '#508AA8',
    gray: '#e0e0e0',
  },
};

type AppTheme = typeof theme;

export const useAppTheme = (): AppTheme => useTheme<AppTheme>();
