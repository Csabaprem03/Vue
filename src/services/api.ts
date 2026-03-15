import axios from "axios";
const instance=axios.create({
    baseURL:import.meta.env.VITE_API_ENDPOINT,
    headers:{
        "Content-Type":"application/json",
        Accept:"application/json"
    }
});
instance.interceptors.request.use(request=>{
    const accessToken=localStorage.getItem('accessToken')
    if (accessToken) {
        request.headers['Authorization']=`Bearer ${accessToken}`;
    }
    return request;
    },error=>{
        return Promise.reject(error)
    })
export default instance