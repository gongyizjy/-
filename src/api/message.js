import webBlog from './request'

export async function getMessages(page=1,limit=10){
    const res = await webBlog({
        url:'/api/message',
        params:{
            page,
            limit,
        }
    })
    return res.data;
}

export async function postMessage(msgInfo){
    const res = await webBlog({
        url:'/api/message',
        method:'post',
        data:msgInfo
    })
    return res.data;
}

