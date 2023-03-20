<template>
  <div class="m-content">
    <h3>欢 迎 进 入 博 客 园</h3>
    <div class="block">
      <el-avatar :size="50" :src="user.avatar"></el-avatar>
      <div>{{user.username}}</div>
    </div>
    <div class="maction">
      <span><el-link type="primary" href="/blogs">主 页</el-link></span>
      <el-divider direction="vertical"></el-divider>
      <span><el-link type="primary" href="/blog/add">发表博客</el-link></span>
      <el-divider direction="vertical"></el-divider>
      <span><el-link type="primary" href="/person">关于博客</el-link></span>
      <el-divider v-if="!hasLogin" direction="vertical"></el-divider>
      <span v-show="!hasLogin"><el-link type="primary" href="/login">登 录</el-link></span>
      <el-divider v-if="hasLogin"  direction="vertical"></el-divider>
      <span v-show="hasLogin"><el-link type="danger" @click="logout">退出登录</el-link></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data(){
    return{
      user:{
        username:'未登录',
        avatar:'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
      },
      hasLogin: false
    }
  },
  methods: {
    logout(){
      const _this = this
      _this.$axios.get("/logout",{
        headers:{
          "Authorization":localStorage.getItem("token")
        }
      }).then(res=>{
        _this.$store.commit("REMOVE_INFO")
        _this.$router.push("/login")
      })
    }
  },
  created(){
    //这里需要换成sessionStorage去获取用户信息，不然点击登录后需要刷新页面store才会生效
    //如果已经有用户登录，则将数据展示到公共页面
    if(this.$store.getters.getUser.username){
      this.user.username = this.$store.getters.getUser.username
      this.user.avatar = this.$store.getters.getUser.avatar
      this.hasLogin = true
    }
  }
}
</script>

<style scoped>
  .m-content {
    max-width: 960px;
    margin: 0 auto;
    text-align: center;
  }
  .maction{
    margin: 10px 0;
  }
</style>