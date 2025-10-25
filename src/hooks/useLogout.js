import axios from "../app/api/axios"
import useAuth from "./useAuth"
import AuthContext from "../context/authProvider"
import { useContext } from "react"

const useLogout = ()=> {
    const {setAuth} = useAuth()
    const {setIsRotated} = useContext(AuthContext)
    
    const logout = async () => {
        setAuth({})
        try {
            const response = await axios('/auth/logout', {
                withCredentials: true
            })
            setIsRotated(false)
         
        } catch (error) {
            console.error(error)
        }
    }
    return logout
}

export default useLogout