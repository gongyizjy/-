import webBlog from './request'

export default async function(){
    const res = await webBlog({
        url:'/api/project'
    })
    return res.data;
}