<template>
  <div>
    <Header></Header>
    <el-carousel :interval="4000" type="card" height="300px">
      <el-carousel-item v-for="item in ImagList" :key="item.id">
        <img style="object-fit: scale-down;width: 100%;height: 100%" :src="item.idView">
      </el-carousel-item>
    </el-carousel>
    <el-divider></el-divider>
    <el-descriptions title="博客信息">
      <el-descriptions-item label="开发者">周泳屹,陈鸿琦,何俊峰</el-descriptions-item>
      <el-descriptions-item label="用途">Web综合实验</el-descriptions-item>
      <el-descriptions-item label="最新公告"><el-link icon="el-icon-message" @click="isShow=true" type="primary">news</el-link></el-descriptions-item>
      <el-descriptions-item label="标签">
        <el-tag size="small">简约博客园</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="主要框架技术">SpringBoot,Vue,ElementUI</el-descriptions-item>
    </el-descriptions>
    <!--公告弹窗-->
    <el-dialog
        title="最新公告"
        :visible.sync="isShow"
        width="50%"
        :before-close="handleClose">
      <span><i class="el-icon-edit">Title:-->{{ Notice.title }}<--</i></span>
      <el-divider content-position="right">{{ Notice.created }}</el-divider>
      <div class="markdown-body" v-html="Notice.content"></div>
      <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="isShow = false">知道了</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import Header from "@/components/Header";
import 'github-markdown-css';

export default {
  name: "Person",
  components: {Header},
  data(){
    return{
      isShow:true,
      Notice:{
        id:'',
        title:'',
        content:'',
        created:''
      },
      ImagList:[
        {id:0,idView:require("@/assets/01.jpg")},
        {id:1,idView:require("@/assets/02.jpg")},
        {id:2,idView:require("@/assets/03.jpg")},
        {id:3,idView:require("@/assets/04.jpg")},
      ]
    }
  },
  methods:{
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
    },

  },
  created() {
    const _this = this;
    _this.isShow = true;
    _this.$axios.get("/notice/find").then(res=>{
      let notices = res.data.data[0];
      _this.Notice.id = notices.id;
      _this.Notice.title = notices.title;
      _this.Notice.created = notices.created;
      let MarkdownIt = require("markdown-it");
      let md = new MarkdownIt();
      _this.Notice.content = md.render(notices.content);
    })
  }
}
</script>

<style scoped>
.el-carousel__item h3 {
  color: #ffffff;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #ffffff;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #ffffff;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.box-card {
  width: 480px;
}
</style>