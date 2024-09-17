let routerTitle = ''
let subTitle = ''
function setTitle(){
    if(!routerTitle && !subTitle){
        document.title = 'loading...'
        return
    }else if(routerTitle && !subTitle){
        document.title = routerTitle
    }else if(!routerTitle && subTitle){
        document.title = subTitle
    }else{
        document.title = `${routerTitle}-${subTitle}`
    }
}

export default{
    setRouteTitle(title){
        routerTitle = title;
        setTitle()
    },
    setSiteTitle(title){
        subTitle = title;
        setTitle()
    }
}