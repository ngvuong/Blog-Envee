import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Blog from './pages/Blog';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/Global';

const theme = {
  colors: {
    header: '#212529',
    gold_primary: '#FFCC20',
    background: '#2C3030',
    text: '#d7dadc',
  },
};

function App() {
  return (
    <div className='App'>
      <Router>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/blog:blogid' element={<Blog />} />
          </Routes>
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
