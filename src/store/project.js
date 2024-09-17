import getProject from '@/api/project'
export default {
    namespaced: true,
    state:{
        loading:false,
        data:[]
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
            if(ctx.state.data.length){
                return
            }
            ctx.commit('setLoading', true)
            const result = await getProject()
            ctx.commit('setData', result)
            ctx.commit('setLoading', false)
        }
    }
}