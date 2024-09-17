import loadingSvg from '@/assets/loading.svg'
import style from './loading.module.less'
function createImg(){
    const img = document.createElement('img');
    img.src = loadingSvg;
    img.classList.add(style.loading) 
    img.dataset.loading = 'loading'
    return img;
}
function getLoading(el){
    return el.querySelector('img[data-loading="loading"]')
}
// console.log(loadingSvg);
export default function(el,binding){
        // console.log(el,binding);
        if(binding.value){
            if(getLoading(el)){
                return;
            }
            const img = createImg();
            el.appendChild(img);
        }else{
            const img = getLoading(el);
            if(img){
                el.removeChild(img);
            }
        }
    }
