
import Mock from 'mockjs'

Mock.mock('/api/project', 'get', {
    code:0,
    msg:'',
    'data|5-10':[{
        id:'@guid',
        name:'@ctitle(3,10)',
        "url|1":['@url', null],
        "github|1": ["@url", null],
        "description|2-4": ["@cparagraph(1, 5)"],
        thumb: "@image(300x250, @color, #fff, @natural)",
    }]
})