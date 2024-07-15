import { createContext, useContext, useEffect, useReducer } from "react";
import { loadAuthState, storeAuthState } from "./storage";
import { setToken } from "@/lib/http";

export const AuthContext = createContext();

export const AuthDispacthContext = createContext();

export function useAuthState() {
  return useContext(AuthContext);
}
export function useAuthDispatch() {
  return useContext(AuthDispacthContext);
}
const authReducer = (authState, action) => {
  switch (action.type) {
    case "login-success":
      setToken(action.data.token);
      return action.data.user;

    case "logout-success":
      return { id: 0 };

    case "user-update-success":
      return {
        ...authState,
        username: action.data.username,
        image: action.data.image,
      };
    default:
      throw new Error(`unknown action: ${action.type}`);
  }
};
export function AuthenticationContext({ children }) {
  const [authState, dispatch] = useReducer(authReducer, loadAuthState());

  useEffect(() => {
    storeAuthState(authState);
  }, [authState]);
  const onLoginSuccess = (data) => {
    setAuth(data);
    storeAuthState(data);
  };

  const onLogoutSuccess = () => {
    setAuth({ id: 0 });
    storeAuthState({ id: 0 });
  };

  return (
    <AuthContext.Provider value={{ authState }}>
      <AuthDispacthContext.Provider value={dispatch}>
        {children}
      </AuthDispacthContext.Provider>
    </AuthContext.Provider>
  );
}
