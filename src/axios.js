import axios from "axios";
import Element from 'element-ui'
import router from './router'
import store from './store'
axios.defaults.baseURL="http://localhost:8081"
//前置拦截：发起请求是进行配置
axios.interceptors.request.use(config=>{
    return config
})

//后置拦截：对后端返回的数据进行校验，登录正确放行，登录错误拦截
axios.interceptors.response.use(response=>{
    let res = response.data;
    if(res.code === 200){
        return response
    }else {//后端返回的代码不是200则表示登录不通过，拦截程序进入下一步
        Element.Message.error(response.data.msg,{duration: 2*1000});//弹出错误提示
        return Promise.reject(response.data.msg)
    }
},
    error => {
    if(error.response.data){
        error.message = error.response.data.msg
    }
    if(error.response.status === 401){
        store.commit("REMOVE_INFO")
        router.push("/login")
    }
    Element.Message.error(error.message,{duration: 2*1000})
        return Promise.reject(error)
    })