<template>
    <div class="message-container" ref="mainContainer">
      <MessageArea 
        title="留言板"
        :subTitle="`${data.total}`"
        :list="data.rows"
        :isListLoading="isloading"
        @submit="handleSubmit"
      class="area"/>
    </div>
  </template>
  
  <script>
  import { getMessages, postMessage} from '@/api/message';
  import MessageArea from '@/components/MessageArea'
  import Data from '@/mixins/fetchData'
  import mainScroll from '@/mixins/setScroll'
  export default {
    mixins:[Data({total:0,rows:[]}), mainScroll('mainContainer')],
    components:{
      MessageArea
    },
    data(){
      return{
        page:1,
        limit:10,
      }
    },
    created(){
      this.$bus.$on('mainScroll', this.handleScroll)
    },
    destroyed(){
      this.$bus.$off('mainScroll', this.handleScroll)
    },
    computed:{
      hasMore(){
        return this.data.rows.length < this.data.total;
      }
    },
    methods:{
      async fetchData(){
          return await getMessages(this.page, this.limit)
      },
      async handleSubmit(data, callback){
          const resp =  await postMessage(data)
          this.data.rows.unshift(resp);
          this.data.total++
          resp ? callback('感谢您的留言', 'success') : callback('留言失败', 'error')
      },
      async loadMore(){
        if(!this.hasMore){
          return;
        }
        this.page++
        this.isloading = true
        const resp = await getMessages(this.page, this.limit)
        this.data.rows = this.data.rows.concat(resp.rows)
        this.data.total = resp.total
        this.isloading = false
      },
      handleScroll(dom){
        if(this.isloading || !dom){
          return
        }
        const range = 100
        const dec = Math.abs(dom.scrollTop + dom.clientHeight - dom.scrollHeight)
        if(dec <= range){
          this.loadMore()
        }
      }
    }
  }
  </script>
  
  <style lang="less" scoped>
    .message-container{
      width: 100%;
      height: 100%;
      padding: 20px;
      overflow-y: auto;
      scroll-behavior: smooth;
      position: relative;
    }
    .area{
      width: 700px;
      margin: 0 auto;
    }
  </style>