import axios from "../app/api/axios";
import useAuth from "./useAuth";
import { axiosPrivate } from "../app/api/axios";

const useRefreshToken = ()=> {
    const {setAuth}  = useAuth()
    const refresh = async () => {
        console.log('on refersh')
        const response = await axios.get('/refresh', {
            // this allows us to send cookies with our request
            withCredentials: true
        })
        setAuth(prev => {
            // console.log(JSON.stringify(prev))
            console.log(response.data.accessToken)
            return {...prev, accessToken: response.data.accessToken,
                roles: response.data.roles,
                user: response.data.username,
                picker: response.data.id,
                users: response.data.users
            }
        })
        return response.data.accessToken
    }
    return refresh
}

export default useRefreshToken