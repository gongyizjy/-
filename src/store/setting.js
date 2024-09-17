import getSetting from '@/api/setting'
import title from '@/utills/titleControl'
export default {
    namespaced:true,
    state:{
        loading:false,
        data:null
    },
    mutations:{
        setLoading(state, payload) {
            state.loading = payload
        },
        setData(state, payload) {
            state.data = payload
        }
    },
    actions:{
        async fetchData(ctx){
            if(ctx.state.data){
                return
            }
            ctx.commit('setLoading', true)
            const result = await getSetting()
            ctx.commit('setData', result)
            ctx.commit('setLoading', false)
            if(result.favicon){
                let link = document.querySelector('link[rel="shortcut icon]')
                if(link){
                   return 
                }
                link = document.createElement('link')
                link.rel ='shortcut icon'
                link.href = result.favicon
                link.type = 'images/x-icon'
                document.querySelector('head').appendChild(link)
            }
            if(result.siteTitle){
                title.setSiteTitle(result.siteTitle)
            }
        }
    }
}