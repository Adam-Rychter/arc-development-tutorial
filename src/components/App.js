import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import Header from './ui/Header'
import theme from './ui/Theme'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      hello!
    </ThemeProvider>

  );
}

export default App;
