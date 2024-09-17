<template>
  <div class="form-area-container" ref="container">
    <form @submit.prevent="handleSubmit" class="form" id="form-comment">
      <div class="form-item">
        <div class="input-area">
          <input type="text" maxlength="10" v-model="formData.nickname" placeholder="用户昵称">
          <span class="tip">{{formData.nickname.length}}/10</span>
        </div>
        <div class="error">{{error.nickname}}</div>
      </div>
      <div class="form-item">
        <div class="textarea-container">
          <textarea maxlength="300" v-model="formData.content" placeholder="请输入内容"></textarea>
          <span class="tip">{{formData.content.length}}/300</span>
        </div>
        <div class="error">{{error.content}}</div>
      </div>
      <div class="form-item">
        <button :disabled="isSubmiting" type="submit">{{isSubmiting?'提交中...':'提交'}}</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data(){
    return{
      formData:{
        nickname:'',
        content:''
      },
      error:{
        nickname:'',
        content:''
      },
      isSubmiting:false
    }
  },
  methods:{
    handleSubmit(){
      // 表单提交
      this.error.nickname = this.formData.nickname?'':'请输入昵称'
      this.error.content = this.formData.content?'':'请输入内容'
      if(this.error.nickname || this.error.content){     
        return;
      }
      // console.log(this.$refs.container);
      this.isSubmiting = true //正在提交中
      this.$emit('submit', this.formData,(msg, status)=>{
        this.$showMessage({
          content: msg,
          type: status,
          container: this.$refs.container,
          callback:()=>{
            this.isSubmiting = false //提交完成
            // console.log(this.isSubmiting);
            this.formData.nickname = ''
            this.formData.content = ''
          }
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/style/var.less';
  .form-area-container{
    overflow: hidden;
    margin: 20px 0;
  }
  .form-item{
    margin-bottom: 8px;
  }
  .input-area{
    width: 50%;
    position: relative;
  }
  .textarea-container{
    position: relative;
  }
  input, textarea{
    display: block;
    width: 100%;
    border: 1px dashed @gray;
    box-sizing: border-box;
    color: @words;
    font-size: 14px;
    border-radius: 4px;
    &:focus{
      border-color: @primary;
      outline: none;
    }
  }
  input{
    padding: 0 15px;
    height: 40px;
  }
  textarea{
    resize: none;
    padding: 8px 15px;
    height: 120px;
    // font-size: 16px;
  }
  .tip{
    right: 5px;
    bottom: 5px;
    position: absolute;
    font-size: 12px;
    color: #b4b8bc;
  }
  .error{
    margin-top: 6px;
    color: @danger;
    font-size: 14px;
    height: 20px;
    line-height: 20px;
    // transition: all 0.5s;
  }
  button{
    position: relative;
    cursor: pointer;
    border: none;
    outline: none;
    width: 100px;
    height: 34px;
    border-radius: 4px;
    color: #fff;
    background: @primary;
    &:hover{
      background: darken(@primary, 10%);
    }
    &:disabled{
      background: lighten(@primary, 20%);
      cursor: not-allowed;
    }
  }
</style>

