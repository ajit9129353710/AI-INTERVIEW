import {
createContext,
useContext,
useState,
useEffect,
} from "react";

import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
const navigate = useNavigate();

const [token, setToken] = useState(
() => localStorage.getItem("token")
);

const [user, setUser] = useState(() => {
try {
const savedUser = localStorage.getItem("user");
return savedUser ? JSON.parse(savedUser) : null;
} catch {
return null;
}
});

const [isAuthenticated, setIsAuthenticated] = useState(
() => Boolean(localStorage.getItem("token"))
);

useEffect(() => {
if (token) {
localStorage.setItem("token", token);
setIsAuthenticated(true);
} else {
localStorage.removeItem("token");
setIsAuthenticated(false);
}
}, [token]);

const login = (newToken, userData = null) => {
localStorage.setItem("token", newToken);
setToken(newToken);

if (userData) {
  localStorage.setItem("user", JSON.stringify(userData));
  setUser(userData);
}

setIsAuthenticated(true);

};

const logout = () => {
localStorage.removeItem("token");
localStorage.removeItem("user");

setToken(null);
setUser(null);
setIsAuthenticated(false);

navigate("/login");

};

const updateUser = (userData) => {
setUser(userData);
localStorage.setItem("user", JSON.stringify(userData));
};

const value = {
user,
token,
isAuthenticated,
login,
logout,
updateUser,
};

return (
<AuthContext.Provider value={value}>
{children}
</AuthContext.Provider>
);
}

export function useAuth() {
const context = useContext(AuthContext);

if (!context) {
throw new Error(
"useAuth must be used inside an AuthProvider"
);
}

return context;
}

export default AuthContext;