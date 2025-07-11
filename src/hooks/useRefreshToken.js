import axios from "../app/api/axios";
import useAuth from "./useAuth";

const useRefreshToken = ()=> {
    const {setAuth}  = useAuth()
    const refresh = async () => {
        console.log('on refersh')
        const response = await axios.get('/refresh', {
            // this allows us to send cookies with our request
            withCredentials: true
        })
        setAuth(prev => {
            console.log(JSON.stringify(prev))
            console.log({data: response.data})
            return {...prev, accessToken: response.data.accessToken,
                roles: response.data.roles,
                username: response.data.username,
                picker: response.data.id
            }
        })
        return response.data
    }
    return refresh
}

export default useRefreshToken