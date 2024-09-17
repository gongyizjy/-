<template>
  <div>
    <h1>test</h1>
    <SubList :list="list" @select="handleSelect"/>
  </div>
</template>

<script>
import SubList from './index.vue'
export default {
    data(){
        return{
            list:[
                {name:'a',isSelected:true},
                {name:'b',isSelected:false},
                {name:'c',isSelected:false},
                {name:'d',isSelected:false,children:[
                    {name:'a',isSelected:true},
                    {name:'a',isSelected:true},
                    {name:'a',isSelected:true},
                    {name:'a',isSelected:true,children:[
                        {name:'a',isSelected:true},
                        {name:'a',isSelected:true},
                        {name:'a',isSelected:true},
                        {name:'a',isSelected:true},
                ]},
                ]},
            ]
        }
    },
    components:{
        SubList
    },
    methods:{
        handleSelect(item){
            console.log(item)
        }
    }
}
</script>

<style>

</style>