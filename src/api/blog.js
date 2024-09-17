import blogWeb from "./request";

export async function getBlogType(){
    const res = await blogWeb({
        url:'/api/blogtype'
    })
    return res.data;
}
export async function getBlog(page=1,limit=10,categoryId=-1){
    const res = await blogWeb({
        url:'/api/blog',
        method: 'get',
        params:{
            page,
            limit,
            categoryId
        }
    })
    return res.data
}

export async function getDetail(id){
    const res = await blogWeb({
        url:`/api/blog/${id}`
    })
    return res.data;
}
export async function postComment(body){
    const res = await blogWeb({
        url:'/api/comment',
        method: 'post',
        data:{
            ...body,
        }
    })
    return res.data;
}

export async function getCommentPage(page=1,limit=10,blogid=-1){
    const res = await blogWeb({
        url:'/api/comment',
        params:{
            page,
            limit,
            blogid
        }
    })
    return res.data;
}