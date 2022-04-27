import { createContext, useReducer, useContext } from 'react';

const BlogContext = createContext([]);

function blogReducer(state, action) {
  switch (action.type) {
    case 'FETCH_BLOGS':
      return {
        ...state,
        blogs: action.blogs,
        isLoading: false,
      };
    case 'LOADING':
      return {
        ...state,
        isLoading: true,
      };
    case 'STOP_LOADING':
      return {
        ...state,
        isLoading: false,
      };
    case 'RESET':
      return {
        ...state,
        blogs: [],
        isLoading: false,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

function BlogProvider({ children }) {
  const [state, dispatch] = useReducer(blogReducer, {
    blogs: [],
    isLoading: false,
  });

  const value = [state, dispatch];
  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
}

function useBlog() {
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error('useBlog must be used within an BlogProvider');
  }
  return context;
}

export { BlogProvider, useBlog };
