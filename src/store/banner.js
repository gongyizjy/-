import getbanner from '@/api/banner'
export default {
    namespaced:true,
    state:{
        loading:false,
        banner:[]
    },
    mutations:{
        setLoading(state, payload) {
            state.loading = payload
        },
        setBanner(state, payload) {
            state.banner = payload
        }
    },
    actions:{
        async fetchBanner(ctx){
            if(ctx.state.banner.length){
                return
            }
            ctx.commit('setLoading', true)
            const result = await getbanner()
            ctx.commit('setBanner', result)
            ctx.commit('setLoading', false)
        }
    }
}