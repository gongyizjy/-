import Mock from "mockjs";

Mock.mock('/api/message','post',{
    code: 0,
    msg: "",
    data: {
      id: '@guid',
      nickname: "@cname(4)",
      content: "@cparagraph(1, 10)",
      createDate: Date.now(),
      "avatar|1": [
        "https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar6.jpg",
        "https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar4.jpg",
        "https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar8.jpg",
        "https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar2.jpg",
      ],
    }
})

Mock.mock(/^\/api\/message(\?.+)?$/,'get',function(option){
    const num = +option.url.split('&')[1].split('=')[1]
    const limit = num
    return Mock.mock({
        code: 0,
        msg: "",
        data: {
            total: 52,
            [`rows|${limit || 10}`]: [
              {
                id: "@guid",
                nickname: "@cname",
                content: "@cparagraph(1, 10)",
                createDate: '@date(T)',
                "avatar|1": [
                  "https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar6.jpg",
                  "https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar4.jpg",
                  "https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar8.jpg",
                  "https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar2.jpg",
                ],
              },
            ],
          },
    })
})