import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Blog from './pages/Blog';
import Admin from './pages/Admin';
import Dashboard from './pages/Dashboard';
import BlogEditor from './pages/BlogEditor';
import ProtectedRoute from './components/ProtectedRoute';
import Footer from './components/Footer';
import { AuthProvider } from './contexts/authContext';
import { BlogProvider } from './contexts/blogContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/Global';

const theme = {
  colors: {
    header: '#212529',
    footer: '#222',
    gold_primary: '#FFCC20',
    gold_secondary: '#FFD700',
    background: '#2C3030',
    text: '#F7F7F7',
    link: '#00b0ff',
  },
};

function App() {
  return (
    <div className='App'>
      <Router>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <AuthProvider>
            <Header />
            <BlogProvider>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='login' element={<Login />} />
                <Route path='register' element={<Register />} />
                <Route path='blogs/:blogid' element={<Blog />} />
                <Route element={<ProtectedRoute redirectPath='/login' />}>
                  <Route path='dashboard' element={<Dashboard />} />
                  <Route path='editor' element={<BlogEditor />} />
                  <Route
                    path='blogs/:blogid/edit'
                    element={<BlogEditor edit />}
                  />
                </Route>
                <Route element={<ProtectedRoute authLevel='admin' />}>
                  <Route path='dashboard/admin' element={<Admin />} />
                </Route>
                <Route path='*' element={<h1>Are you lost?</h1>} />
              </Routes>
            </BlogProvider>
          </AuthProvider>
          <Footer />
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
