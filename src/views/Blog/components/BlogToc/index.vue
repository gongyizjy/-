<template>
  <div class="blog-toc-container">
    <h2>目录</h2>
    <SubList :list="list" @select="handleSelect"/>
  </div>
</template>

<script>
import SubList from "../SubList"
import debounce from "@/utills/debounce"
export default {
  components:{
    SubList
  },
  props:{
    toc:{
      type:Array,
      required:true,
    }
  },
  data(){
    return {
      activeAnchor: '',
    }
  },
  computed:{
      list(){
        const getToc = (toc=[])=>{
          return toc.map(item=>{
            return {
              ...item,
              isSelected: item.anchor === this.activeAnchor,
              children: getToc(item.children),
            }
          })
        }
        return getToc(this.toc)
      },
      getDom(){
        const dom = []
        const addDoms = (toc)=>{
          // console.log(toc, '.....');
          for (const item of toc) {
            dom.push(document.querySelector(`#${item.anchor}`))
            if(item.children && item.children.length) addDoms(item.children)
          }
        }
        addDoms(this.toc)
        // console.log(dom);

        return dom
      }
  },
  created(){
    this.debounce = debounce(this.setSelected,50)
    this.$bus.$on('mainScroll', this.debounce)
  },
  destroyed(){
    this.$bus.$off('mainScroll', this.debounce)
  },
  methods:{
    handleSelect(item){
      // console.log(item);
      location.hash = item.anchor
      this.activeAnchor = item.anchor
      // console.log(this.getDom);
    },
    setSelected(dom){
      // console.log(dom);
      console.log(this.getDom);
      if(!dom){
        return;
      }
      this.activeAnchor = ''
      const range = 200
      for (const item of this.getDom) {
        if(!item){
          continue
        }
        const top = item.getBoundingClientRect().top
        if(top >= 0 && top <= range){
          this.activeAnchor = item.id
          // location.hash = this.activeAnchor
          return;
        }else if(top > range){
          return;
        }else{
          this.activeAnchor = item.id
        }
      }
    }
  },
}
</script>

<style lang='less' scoped>
.blog-toc-container{
  width: 100%;
  height: 100%;
  padding: 20px;
  position: relative;
  h2{
    font-size: 1em;
    letter-spacing: 2px;
  }
}
</style>