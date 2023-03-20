import router from "./router";
import Element from "element-ui";
// 路由判断登录 根据路由配置文件的参数
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requireAuth)) { // 判断该路由是否需要登录权限
        const token = localStorage.getItem("token")
        if (token) { // 判断当前的token是否存在 ； 登录存入的token
            if (to.path === '/login') {
            } else {
                next()
            }
        } else {
            Element.Message.warning("请先登录!",{duration: 2*1000});//弹出提示登录信息
            next({
                path: '/login'
            })
        }
    } else {
        next()
    }
})