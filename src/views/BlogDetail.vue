<template>
  <div>
    <Header></Header>
    <div class="mblog">
      <h2>{{blog.title}}</h2>
      <el-link icon="el-icon-edit" v-if="ownBlog">
        <!--router-link中的name属性表示跳转的单页组件名-->
        <router-link :to="{name:'BlogEdit',param:{blogId: blog.id}}">编辑博客</router-link>
      </el-link>

      <el-divider v-if="ownBlog" direction="vertical"></el-divider>

      <el-link icon="el-icon-delete" v-if="ownBlog" @click="delBlog">删除博客</el-link>

      <el-divider></el-divider>
      <div class="markdown-body" v-html="blog.content"></div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import "github-markdown-css/github-markdown.css"
export default {
  name: "BlogDetail",
  components: {Header},
  data(){
    return{
      blog:{
        id:'',
        title:'',
        content:''
      },
      ownBlog:false
    }
  },
  methods: {
    delBlog() {
      const blogId = this.$route.params.blogId
      console.log(blogId)
      const _this = this
      if (blogId) {
        this.$confirm('此操作将永久删除该博客, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          _this.$axios.post('/blogDel',{
            id:blogId
          },{
            headers:{
              "Authorization":localStorage.getItem("token")
            }
          }
          ).then(res=> {
            //删除成功进行提示+跳转
            this.$message({
              type: 'success',
              message: res.data.data
            });
            _this.$router.push("/blogs")
          }).catch(error=>{
            //后端处理异常
            this.$message({
              type: 'warning',
              message: error.data.data
            });
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    }
  },
  created() {
      const blogId = this.$route.params.blogId
      const _this = this
      if (blogId) { //如果id存在，则对内容进行回显
        this.$axios.get('/blog/' + blogId).then(res => {
          const blog = res.data.data
          _this.blog.id = blog.id
          _this.blog.title = blog.title
          var MarkdownIt = require("markdown-it")
          var md = new MarkdownIt()
          var result = md.render(blog.content)
          _this.blog.content = result
          //只有查看的文章属于该用户时才展示编辑功能
          _this.ownBlog = (blog.userId === _this.$store.getters.getUser.id)
        })
      }
    }
  }
</script>

<style scoped>
  .mblog{
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    width: 100%;
    min-height: 700px;
    padding: 20px 15px;
  }
</style>