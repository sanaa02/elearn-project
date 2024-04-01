import axios from "axios";
import jwtDecode from "jwt-decode";
import dayjs from "dayjs";
import { useContext } from "react";
import AuthContext from "../AuthContext";

const baseURL = "http://127.0.0.1:8000/account/";

const useAxios = () => {
    const { authTokens, setUser, setAuthTokens} = useContext(AuthContext);

    const axiosInstance = axios.create({
        baseURL, 
        headers: { Authorization: `Bearer ${authTokens?.access}`}
     });

     axiosInstance.interceptors.request.use(async request =>{
        const user = jwtDecode(authTokens.access);
        const isExpired  = dayjs.unix(user.exp).diff(dayjs()) < 1;

        if(!isExpired){
            return request;
        };

        const response = await axios.post(`${baseURL}/token/refresh/`, {
            refresh: authTokens.refresh
        });
        localStorage.setItem("authTokens", JSON.stringify(response.data));

        setAuthTokens(response.data);
        setUser(jwt_decode(response.data.access));

        request.headers.Authorization = `Bearer ${response.data.access}`;
        return request;
     });

     return axiosInstance;
};

export default useAxios;

