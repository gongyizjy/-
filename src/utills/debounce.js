export default function debounce(fn, duration) {
    let timer = null;
    return function(...args) {
        // console.log(args);
        const curThis = this
        // console.log(curThis);
        if(timer){
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            fn.call(curThis,...args)
        }, duration);
    }

}