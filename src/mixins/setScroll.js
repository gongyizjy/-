export default function(refValue){
    return {
        created(){
            this.$bus.$on('setMainScroll', this.handleSetMainScroll)
        },
        mounted(){
            this.$refs[refValue].addEventListener('scroll', this.handleMainScroll)
        },
        beforedestroyed(){
            this.$refs[refValue].removeEventListener('scroll', this.handleMainScroll)
        },
        destroyed(){
            this.$bus.$emit('mainScroll')
            this.$bus.$off('setMainScroll', this.handleSetMainScroll)
        },
        methods:{
            handleMainScroll(){
                // console.log(this.$refs[refValue]);
                this.$bus.$emit('mainScroll', this.$refs[refValue])
            },
            handleSetMainScroll(top){
                this.$refs[refValue].scrollTop = top 
            }
        }
    }
}