import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'

Vue.use(Router);
const router = new Router({
    mode: "history",
    // mode: "hash",
    linkExactActiveClass: 'active',
    // 制定滚动行为
    //注：scrollBehavior 只在支持 history.pushState 的浏览器中可用，history.pushState 用来在浏览历史中添加一条新的记录。
    scrollBehavior (to, from, savedPosition) {
        let top = window.pageYOffset ||document.documentElement.scrollTop || document.body.scrollTop || 0;
        return new Promise((resolve, reject) => {
            if (savedPosition) {
                resolve(savedPosition)
            } else {
                if (from.meta.keepAlive) {
                    from.meta.savedPosition = top;
                }
                resolve({ x: 0, y: to.meta.savedPosition ||0})
            }
        }).catch(function(error) {
            console.log('发生错误！', error);
        });
    },
    routes
});


// 全局前置守卫
router.beforeEach((to,from,next) => {
     next();
    // 获取浏览器token
    // const session = window.localStorage.getItem('session')
    // // 如果没有session
    // if (!session) {
    //     // 如果去的是登录
    //     if (to.path === '/') {
    //         next(); // 放行
    //     } else {
    //         // 否则 跳转到登录
    //         next({path: '/'})
    //     }
    // } else {
    //     next(); // 放行
    // }
});

// 注册全局后置钩子
// router.afterEach((to, from) => {
//     // window.scrollTo(0, 0);
// });

// 当捕获到了Loading chunk {n} failed的错误时，重新渲染目标页面。
router.onError((error) => {
    const pattern = /Loading chunk (\d)+ failed/g;
    const isChunkLoadFailed = error.message.match(pattern);
    const targetPath = router.history.pending.fullPath;
    if(isChunkLoadFailed){
        router.replace(targetPath);
    }
})

export default router
