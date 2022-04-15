import { createContext, useReducer, useContext } from 'react';

const AuthContext = createContext({});

function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        user: action.user,
      };
    case 'LOGIN_FAIL':
      return {
        ...state,
        isAuthenticated: false,
        error: action.error,
        user: null,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    case 'RESET':
      return {
        ...state,
        error: null,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, {
    isAuthenticated: localStorage.getItem('user') !== null,
    user: localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user'))
      : null,
    error: null,
  });

  const value = [state, dispatch];
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export { AuthProvider, useAuth };
