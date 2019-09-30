<template>
    <div class="common_box">
        <div class="common_left">
            <LeftNav :menuData="menuData"/>
        </div>
        <div class="common_right">
            <div class="common_right_box">
                <template v-if="$route.meta.keepAlive">
                    <keep-alive>
                        <router-view transition-mode="out-in"></router-view>
                    </keep-alive>
                </template>
                <template v-else>
                    <router-view transition-mode="out-in"></router-view>
                </template>
            </div>
        </div>
        <!--<button id="to-top-btn" @click="returnTop">返回顶部</button>-->
    </div>
</template>

<script>
    /*概述&大屏*/
    import LeftNav from '@/components/LeftNav/LeftNav'
    export default {
        name: "Overview",
        components:{
            LeftNav
        },
        data() {
            return {
                //导航列表数据
                menuData:[
                    // 数据看板
                    {
                        menuTitle: '数据看板',
                        add:'+',
                        dec:'-',
                        path: '/overview',
                        children: [
                            {
                                path: "/overview",
                                subMenuTitle: "舆情概览",
                                children: []
                            },
                            {
                                path: "/overview/netizen",
                                subMenuTitle:"网民声量分析",
                            },
                            {
                                path: "/overview/media",
                                subMenuTitle:"媒体声量分析",
                            },
                            {
                                path: "/overview/product",
                                subMenuTitle: "产品",
                            },
                        ]

                    },
                    // 全部舆情
                    {
                        menuTitle: '全部舆情',
                        path: "/overview/allOpinion",
                        add: '+',
                        dec: '-',
                        children: [
                            {
                                path: "/overview/allOpinion",
                                subMenuTitle: "全部舆情",
                            }
                        ]
                    },
                    // 舆情定向追踪
                    {
                        menuTitle: '舆情定向追踪',
                        path: "/overview/track",
                        add: '+',
                        dec: '-',
                        children: [
                            {
                                path: "/overview/track",
                                subMenuTitle: "舆情定向追踪",
                            }
                        ]
                    },
                    // 基础数据可视化
                    {
                        menuTitle: '基础数据可视化',
                        path: "/overview/visual",
                        add: '+',
                        dec: '-',
                        children: [
                            {
                                path: "/overview/visual",
                                subMenuTitle: "基础数据可视化",
                            }
                        ]
                    },


                ],
                route: '',
                returnTopElm: null
            }
        },
        methods:{
            scrollToTop(el) {
                let topBtn = document.getElementById('to-top-btn');
                if (!this.returnTopElm) {
                    return false;
                }
                let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                if (scrollTop > 500) {
                    topBtn.style.display = 'block';
                } else {
                    topBtn.style.display = 'none';
                }
            },
            returnTop(){
                document.body.scrollTop = 0
                document.documentElement.scrollTop =0
            }
        },
        created() {
            this.route = this.$route.name;
        },
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/styles/leftNav.scss";
</style>
