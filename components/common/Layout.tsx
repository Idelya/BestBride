import { createTheme, ThemeProvider } from '@mui/material';
import React, { ReactNode } from 'react';

import { theme } from '../../styles/theme';

const cTheme = createTheme(theme);

interface LayoutProps {
    children: ReactNode
}
function Layout({ children }: LayoutProps) {
  return <ThemeProvider theme={cTheme}>
      {children}
  </ThemeProvider>;

}
export default Layout
