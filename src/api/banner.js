import blogWeb from "./request";

export default async function(){
    const res = await blogWeb({
        url:'/api/banner'
    })
    return res.data;
}