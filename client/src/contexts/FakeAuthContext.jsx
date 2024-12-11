import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "logout":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };

    case "setUser":
      return {
        ...state,
        user: action.payload,
      };

    default:
      throw new Error("Unknown action type!");
  }
};

function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function logout() {
    localStorage.removeItem("token");
    dispatch({ type: "logout" });
  }

  function setUser(user) {
    const avatar = `https://i.pravatar.cc/100?u=${user?.password?.slice(0, 2)}`;
    const loggedUser = {
      ...user,
      avatar,
    };
    dispatch({ type: "setUser", payload: loggedUser });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        logout,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext wa used outside AuthProvider! ");
  return context;
}

export { AuthProvider, useAuth };
