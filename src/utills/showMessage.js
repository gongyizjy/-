import getComponentRootDom from "./getComponentRootDom";
import Icon from '@/components/Icon';
import styles from './message.module.less'
/**
 * 
 * @param {object} option 配置对象
 */
function showMessage(option={}){
    const content = option.content || ''
    const duration =  2000
    const container = option.container || document.body
    const type = option.type || 'info'
    const div = document.createElement('div')
    const iconDom = getComponentRootDom(Icon,{type})
    // console.log(iconDom.outerHTML);
    div.innerHTML = `<span class='${styles.icon}'>${iconDom.outerHTML}</span><p>${content}</p>`
    // console.log(div);
    // console.log(styles);
    div.className = `${styles.message} ${styles[`message-${type}`]}`

    if(option.container){
        if(getComputedStyle(container).position === 'static'){
            container.style.position = 'relative'
        }
    }
    container.appendChild(div)
    // div.clientHeight;
    div.style.animationPlayState = `running`
    setTimeout(() => {
        div.addEventListener('animationend',function(){
            this.remove()
            option.callback && option.callback()
        })
    }, duration);
}

export default showMessage