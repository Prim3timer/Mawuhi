import { useContext, useDebugValue } from "react";

import AuthContext from "../context/authProvider";

const useAuth = ()=> {
      const { auth, setAuth } = useContext(AuthContext);
    useDebugValue(auth, auth => auth?.user ? "Logged In" : "Logged Out")
    return useContext(AuthContext);
}

export default useAuth