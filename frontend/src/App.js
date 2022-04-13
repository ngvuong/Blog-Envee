import Header from './components/Header';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/Global';

const theme = {
  colors: {
    header: '#212529',
    primary_gold: '#FFCC20',
    background: '#2C3030',
    text: '#d7dadc',
  },
};

function App() {
  return (
    <div className='App'>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Header />
      </ThemeProvider>
    </div>
  );
}

export default App;
