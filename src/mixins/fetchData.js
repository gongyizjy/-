//混合公共配置（获取数据）
export default function(dataType = null){
    return{
        data(){
            return{
                data:dataType,
                isloading:true
            }
        },
        async created(){
            const result = await this.fetchData()
            // console.log(result);
            this.data = result;
            this.isloading = false;
        }
    }
}