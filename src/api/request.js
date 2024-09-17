import axios from "axios";
import showMessage from "@/utills/showMessage";
const blogWeb = axios.create({
    timeout: 10000,
})
blogWeb.interceptors.response.use(function(response){
    if(response.data.code !== 0){
        showMessage({content: '获取数据失败',type: 'error'});
        return null
    }
    return response.data
})

export default blogWeb;