export default [
    // 登录
    {
        path: `/login`,
        name: 'login',
        component: ()=>import('../pages/Login/Login'),
        meta: {
            title: '登录'
        }
    },
    // 首页
    {
        path: '/',
        name: 'index',
        redirect: {path: '/overview'},
        component: ()=>import('@/pages/Index/Index'),
    },
    // 概述&大屏
    {
        path: `/overview`,
        name: 'overview',
        component: () => import('@/pages/Overview/Overview'),
        children: [
            // 舆情概览(默认)
            {
                path: '/overview',
                name: 'overviewOpinion',
                component: () => import('@/pages/Overview/Kanban/Opinion'),
                meta: {
                    auth: true,
                    title: '舆情概览'
                }
            },
            {
                path: '/overview/netizen',
                name: 'netizen',
                component: () => import('@/pages/Overview/Kanban/Netizen'),
                meta: {
                    auth: true,
                    title: '网民声量分析'
                }
            },
            {
                path: '/overview/media',
                name: 'media',
                component: () => import('@/pages/Overview/Kanban/Media'),
                meta: {
                    auth: true,
                    title: '媒体声量分析'
                }
            },
            {
                path: '/overview/product',
                name: 'product',
                component: () => import('@/pages/Overview/Kanban/Product'),
                meta: {
                    auth: true,
                    title: '产品'
                }
            },
            {
                path: '/overview/allOpinion',
                name: 'allOpinion',
                component: () => import('@/pages/Overview/Opinion/Opinion'),
                meta: {
                    auth: true,
                    title: '全部舆情'
                }
            },
            {
                path: '/overview/track',
                name: 'track',
                component: () => import('@/pages/Overview/Track/Track'),
                meta: {
                    auth: true,
                    title: '舆情定向追踪'
                }
            },
            {
                path: '/overview/visual',
                name: 'visual',
                component: () => import('@/pages/Overview/Visual/Visual'),
                meta: {
                    auth: true,
                    title: '基础数据可视化'
                }
            },
        ]
    },
    // 全网大数据
    {
        path: `/bigData`,
        name: 'bigData',
        component: () => import('@/pages/BigData/BigData')
    },
    // 话题观测
    {
        path: `/topic`,
        name: 'topic',
        component: () => import('@/pages/Topic/Topic')
    },
    // 用户观测
    {
        path: `/user`,
        name: 'user',
        component: () => import('@/pages/User/User')
    },
    // 话题风向
    {
        path: `/wind`,
        name: 'WindDirection',
        component: () => import('@/pages/WindDirection/WindDirection')
    },
    // 舆情配置
    {
        path: `/opinion`,
        name: 'opinion',
        component: () => import('@/pages/Opinion/Opinion')
    },
    // 个人中心
    {
        path: `/personal`,
        name: 'personal',
        component: () => import('@/pages/Personal/Personal')
    },
    // 404
    {
        path: `/error`,
        name: 'error',
        component: () => import('@/pages/Error/404'),
        meta: {
            title: '错误页面404'
        }
    },
   // { path: '*', redirect: '/error' }   /*默认跳转路由*/
]
