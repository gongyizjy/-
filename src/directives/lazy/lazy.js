import Bus from '@/Bus.js'
import lazyPicture from '@/assets/default.gif'
import debounce from '@/utills/debounce.js'
let imgs = []
//处理单张图片
function setImage(img){
    img.dom.src = lazyPicture;
    //在不在视口内,显示占位的图片，等待主图加载完成之后再替换
    const top = img.dom.getBoundingClientRect().top;
    const height = img.dom.clientHeight
    const Height = document.documentElement.clientHeight
    // console.log(Height);
    if(top >= -height && top < Height){//在视口内
        const tempImg = new Image()
        tempImg.addEventListener('load',function(){
            img.dom.src = img.src;
            //将已经渲染好的东西给删除掉
        })
        tempImg.src = img.src;
        imgs = imgs.filter(i => i !== img)

    }


}
function setImages(){
    for (const img of imgs) {
        setImage(img)
    }
}
Bus.$on('mainScroll', debounce(setImages,50))

export default {
    inserted(el, bindings){
        const img = {
            dom: el,
            src: bindings.value
        }
        imgs.push(img)
        setImage(img)
    },
    unbind(el){
        imgs = imgs.filter((img) => img.dom !== el);
    }
}