import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const user = localStorage.getItem("user");
    if (user) {
      setUser(user);
    }
    setLoading(false);
  }, []);

  function login() {
    localStorage.setItem("user", JSON.stringify({ name: "admin", id: "1234" }));
    setUser({ name: "admin", id: "1234" });
    router.push("/");
  }

  function logout() {
    localStorage.clear();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export default useAuth;
