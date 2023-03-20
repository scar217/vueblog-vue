<template>
  <div class="login">
    <el-container>
      <el-aside width="450px">
        <div class="aside-img">
          <img src="../assets/创意发散.jpg" width="800" height="600">
        </div>
      </el-aside>
      <el-main>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm aaa">
          <div class="m_title">访客登录</div>
          <el-form-item label="用户姓名" prop="username">
            <el-input placeholder="请输入用户名" prefix-icon="el-icon-user" v-model="ruleForm.username"></el-input>
          </el-form-item>
          <el-form-item label="用户密码" prop="password">
            <el-input type="password" placeholder="请输入用户密码" prefix-icon="el-icon-lock" v-model="ruleForm.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">登 录</el-button>
            <el-button @click="dialogFormVisible = true">注 册</el-button>
          </el-form-item>
        </el-form>
<!--注册弹窗表单-->
        <el-dialog title="访客注册" :visible.sync="dialogFormVisible" width="40%">

          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item prop="dia_username" label="用户名">
              <el-input placeholder="请输入用户名" prefix-icon="el-icon-user" v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-radio-group v-model="form.status">
                <el-radio :label="1">男</el-radio>
                <el-radio :label="0">女</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item prop="dia_password" label="密码">
              <el-input placeholder="请输入用户密码" prefix-icon="el-icon-lock" type="password" v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item prop="dia_email" label="邮箱">
              <el-input placeholder="请输入邮箱地址" prefix-icon="el-icon-message" v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item prop="dia_avatar" label="头像">
              <el-input placeholder="请输入头像地址" prefix-icon="el-icon-picture-outline-round" v-model="form.avatar"></el-input>
            </el-form-item>
          </el-form>

          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogSubmit(form)">注 册</el-button>
          </div>
        </el-dialog>

      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      ruleForm: {
        username: '',
        password: ''
      },
      form: {
        username: '',
        email: '',
        password: '',
        avatar: '',
        status:''
      },
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'change'}
        ],
        status: [
          {required: true, message: '告诉一下我你的性别吧', trigger: 'change'}
        ],

      },
      dialogFormVisible: false,
      formLabelWidth: '120px'
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const _this = this
          this.$axios.post('/login', this.ruleForm).then(res => {
            const jwt = res.headers['authorization']
            console.log("jwt:" + jwt)
            const userInfo = res.data.data
            console.log(userInfo)
            //把数据共享给其他组件
            _this.$store.commit("SET_TOKEN", jwt)
            _this.$store.commit("SET_USERINFO", userInfo)
            //获取数据
            console.log(_this.$store.getters.getUser)
            _this.$router.push("/blogs")
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    dialogSubmit(form) {
        this.$axios.post('/user/save',form).then(res=>{
          this.$message({
            type: 'success',
            message: res.data.data
          });
          this.dialogFormVisible = false;
          this.form = {username:'',password:'',avatar: '',email: ''}
        }).catch(error=>{
          this.$message({
            type: 'warning',
            message: error.data.data
          });
        })
      }
  }
}
</script>

<style scoped>
/*设置样式*/
.demo-ruleForm{
  border: 1px solid #DCDFE6;
  width: 350px;
  margin: 180px auto;
  padding: 35px 120px 15px 25px;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  box-shadow: 0 0 25px #909399;
}

/* 背景图片*/
.login{
  background:url("../assets/LoginBackgroud.jpg");
  width: 100%;
  height: 100%;
  position:fixed;
  margin-top: -10px;/*上边距*/
  margin-left: -278px;/*左边距*/
  background-size:100% 100%;
}

/* 背景图片*/
.aaa{
  width: 26%;
  height: 24%;
  position:fixed;
  margin-top: 260px;/*上边距*/
  margin-left:460px;/*左边距*/
  background-size:100% 100%;
}
.aside-img{
  position: fixed;
  margin-top: 30px;
}
.m_title{
  color: rgba(52, 58, 63, 1);
  font-weight: 600;
  font-size: 16px;
  text-align: center; /*水平居中 */
  line-height: 15px; /*垂直居中 */
}
</style>