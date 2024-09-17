import webBlog from './request'

export default async function(){
    const result = await webBlog({
        url:'/api/about'
    })
    return result.data
}