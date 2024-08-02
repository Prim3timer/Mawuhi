import { createContext, useState, useReducer } from "react";
import initialState from "../store";
import reducer from "../reducer";

const AuthContext = createContext({})
export const AuthProvider = ({children}) => {
    // const [state, dispatch] = useReducer(reducer, initialState)
    const [auth, setAuth] = useState({})
    return (

        <AuthContext.Provider value={{auth}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext