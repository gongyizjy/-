<template>
    <img class="avatar-img" :src="url" :style="{width:width+'px',height:height+'px'}"/>
  </template>
  
  <script>
  export default {
      props:{ //属性
          url:{
              type: String, //url属性必须是一个字符串
              required: true //属性必须要传递
          },
          width:{
              type:Number,
              default:150 //默认值
          },
          height:{
              type:Number,
              default:150 //默认值
          }
      }
  }
  </script>
  
  <style scoped>
      .avatar-img{
          border-radius: 50%;
          object-fit: cover;
          display: block;
      }
  </style>