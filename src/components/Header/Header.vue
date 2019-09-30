<template>
    <div class="header">
        <div class="top">
            <el-row :gutter="20">
                <el-col :span="3" class="left_log">
                    <div>
                        <img :src="logo | filterImg" alt="">  <div class="left_tit">汽车大数据驾驶舱</div>
                    </div>
                </el-col>
                <el-col :span="18" >
                    <el-menu
                            :default-active="path"
                            class="el-menu-demo"
                            mode="horizontal"
                            text-color="#fff"
                            active-text-color="#01bedf"
                            unique-opened
                            router>
                        <el-menu-item v-for="(menu, index)  in menuData" :key="index" :index="menu.path">
                            <template slot="title">
                                <i v-if="menu.adder">
                                    <img v-if="_.startsWith(path, menu.path)"
                                         :src="menu.adder.split('.')[0] + 'active.png' | filterImg"/>
                                    <img v-else :src="menu.adder | filterImg"/>
                                </i>
                                <span @click="getNotice(menu.menuTitle)" :class="{headerActive:
                                (menu.path === path && path === '/personal/inform')
                                 || (path !== '/personal/inform' && _.startsWith(path, menu.path))}">
                                    {{ menu.menuTitle === '通知' ? `${menu.menuTitle } (${notice}) `: menu.menuTitle}}
                                </span>
                                <i v-if="menu.adderss"><img :src="menu.adderss | filterImg"/></i>
                            </template>
                        </el-menu-item>
                    </el-menu>
                </el-col>
                <el-col :span="3">
                    <div class="top-nav-right">
                        <span> {{name}}</span>
                        <span class="login_btn" @click="loginOut">退出</span>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex'
    export default {
        name: "Header",
        data() {
            return {
                name: '用户名',
                path: '',
                logo: 'logo.png',
                notice: 0,
                menuData: [
                    {
                        menuTitle: '概述&大屏',
                        path: '/overview',
                        // icon: "new_a.png"
                    },
                    {
                        menuTitle: '全网大数据',
                        path: '/opinion',
                        // icon: "new_a.png"
                    },
                    {
                        menuTitle: '话题观测',
                        path: '/topic',
                        // icon: "new_a.png"
                    },
                    {
                        menuTitle: '用户观测',
                        path: '/user',
                        // icon: "new_a.png"
                    },
                    {
                        menuTitle: '话题风向',
                        path: '/wind',
                        // icon: "new_a.png"
                    },
                    {
                        menuTitle: '舆情配置',
                        path: '/opinion',
                    },
                    {
                        menuTitle: '通知',
                        path: '/personal',
                        address: "icon-down.png"
                    },
                    {
                        menuTitle: '个人中心',
                        path: '/personal',
                        address: "icon-down.png"
                    }
                ]
            }
        },
        // computed: {
        //     ...mapState('personalMD', [
        //         'notice'
        //     ])
        // },
        methods: {
            getNotice(title) {
                if (title === '通知') {
                    // this.getNoticeNumber();
                }
                this.$root.Bus.$emit('handleHeadMenu');
            },
            ...mapActions({
                getNoticeNumber: 'personalMD/getNoticeNumber',
                loginOut: 'loginMD/loginOut'
            })
        },
        watch: {
            '$route'(to) {
                // 监听跳转的路由确定激活样式
                this.path = to.path === '/' ? '/overview' : to.path;
            }
        },
        created() {
            if (this.ls.getItem('username')) {
                // this.name = this.$store.state.loginMD.username || window.localStorage.getItem('username');
                this.name = this.ls.getItem('username');
                this.name = this.name.replace(/\"/g, '');
                this.$store.commit('loginMD/UPDATE_USER', this.name);
                this.$store.commit('loginMD/UPDATE_SESSION', this.ls.getItem('session').replace(/\"/g, ''));
            }
            //this.getNoticeNumber();
            // 初始化时确定激活样式
            if (!this.$route.path.includes(this.path) || this.path === '') {
                // this.path = this.$route.path;
                this.path = this.$route.path === '/' ? '/overview' : this.$route.path;
            }
        },
        mounted() {
        },
    }
</script>

<style lang="scss" scoped>
    @import './Header';
</style>
