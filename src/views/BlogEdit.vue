<template>
  <div>
    <Header></Header>
    <div class="m-content">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="标题" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>

        <el-form-item label="摘要" prop="description">
          <el-input type="textarea" v-model="ruleForm.description"></el-input>
        </el-form-item>

        <el-form-item label="内容" prop="content">
          <mavon-editor v-model="ruleForm.content"></mavon-editor>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即发表</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>

      </el-form>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
export default {
  name: "BlogEdit",
  components: {Header},
  data() {
    return {
      ruleForm: {
        id:'',
        title: '',
        description: '',
        content:''
      },
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入摘要', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) =>
      {
        if (valid) {
          const _this = this
          _this.$axios.post('/blog/edit',this.ruleForm,{
            headers:{
              "Authorization":localStorage.getItem("token")
            }
          }).then(res=>{
            _this.$confirm('确认进行此操作?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$message({
                type: 'success',
                message: '操作成功!'
              });
              _this.$router.push("/blogs")
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消'
              });
            });
          })
        } else {
          this.$message({
            type: 'error',
            message: '操作失败,请检查输入要求!'
          });
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$message({
        type: 'warning',
        message: '已重置!'
      });
      this.$refs[formName].resetFields();
    }
  },
  mounted() {
    const blogId = this.$route.params.blogId
    const _this = this
    if(blogId){ //如果id存在，则对内容进行回显
      this.$axios.get('/blog/'+blogId).then(res=>{
        const blog = res.data.data
        _this.ruleForm.id = blog.id
        _this.ruleForm.title = blog.title
        _this.ruleForm.description = blog.description
        _this.ruleForm.content = blog.content
      })
    }
  }
}
</script>

<style scoped>
  .m-content{
    text-align: center;
  }
</style>