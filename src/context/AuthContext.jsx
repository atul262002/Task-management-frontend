import { createContext, useContext, useReducer } from "react";
import authService from "../services/authService";
import setAuthToken from "../utils/setAuthToken";

const AuthContext = createContext();

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  loading: true,
  user: {},
  error: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "USER_LOADED":
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload ,
      };
    case "REGISTER_SUCCESS":
    case "LOGIN_SUCCESS":
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case "AUTH_ERROR":
    case "REGISTER_FAIL":
    case "LOGIN_FAIL":
    case "LOGOUT":
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: {},
        error: action.payload,
      };
    case "CLEAR_ERROR":
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load User
  const loadUser = async () => {
    try {
      const user = await authService.getCurrentUser();
      dispatch({
        type: "USER_LOADED",
        payload: user,
      });
    } catch (err) {
      dispatch({
        type: "AUTH_ERROR",
        payload: err.message,
      });
    }
  };

  // Register User
  const register = async (formData) => {
    try {
      const data = await authService.register(formData);
      dispatch({
        type: "REGISTER_SUCCESS",
        payload: data,
      });
      loadUser();
    } catch (err) {
      dispatch({
        type: "REGISTER_FAIL",
        payload: err.message,
      });
    }
  };

  // Login User
  const login = async (formData) => {
    try {
      const data = await authService.login(formData);
      localStorage.setItem("token", data?.token);
      await setAuthToken(data?.token);
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: data,
      });
      await loadUser();
    } catch (err) {
      dispatch({
        type: "LOGIN_FAIL",
        payload: err.message,
      });
    }
  };

  // Logout
  const logout = () => dispatch({ type: "LOGOUT" });

  // Clear Errors
  const clearErrors = () => dispatch({ type: "CLEAR_ERROR" });

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        login,
        logout,
        loadUser,
        clearErrors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
