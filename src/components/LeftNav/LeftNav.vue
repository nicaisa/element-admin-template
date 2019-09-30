<template>
    <div class="left-nav">
        <el-menu
                :default-active="$route.path"
                class="el-menu-vertical-demo"
                text-color="#fff"
                active-text-color="#fff"
                :unique-opened="uniqueOpened"
                :default-openeds="openeds"
                @open="handleOpen"
                router>
            <template  v-for="(menu, index) in menuData">
                <el-menu-item v-if="menu.children === undefined" :key="index" :index="menu.path">
                    <div class="el-submenu__title-default" :class="{ 'active': isActive == index }"
                         @click="isActive = index; path =  menu.path;">
                        <i v-if="menu.iconMenu">
                            <img  :src=" path === menu.path ? menu.iconMenu[1] : menu.iconMenu[0]  | filterImg('icon')" />
                        </i>
                        <span>{{ menu.menuTitle }}</span>
                    </div>
                </el-menu-item>
                <el-submenu v-else :key="index" :index="index.toString()" :id="index">
                    <template slot="title">
                        <div style="position: relative" class="el-submenu__title-default" :class="{ 'active': isActive === index }"
                             @click="handleMenu(index, menu.path)">
                            <strong class="menu-title">{{ menu.menuTitle }}</strong>
                            <span class="dec-btn" v-if="isActive == index">{{menu.dec}}</span>
                            <span class="add-btn" v-else>{{menu.add}}</span>
                        </div>
                    </template>
                    <el-menu-item  v-for="(subMenu, i) in menu.children" :key="`${index}-${i}`"
                                   :index="subMenu.path" @click="path = subMenu.path">
                            <span :class="{'subMenu-active': path === subMenu.path ||
                            (subMenu.children && subMenu.children.includes(name)) }"> {{ subMenu.subMenuTitle }}</span>
                    </el-menu-item>
                </el-submenu>
            </template>
        </el-menu>
    </div>
</template>

<script>
    export default {
        name: "LeftNav",
        data() {
            return {
                name: "LeftNav",
                openeds: [1],
                uniqueOpened: true,
                path: '',
                name: '',
                isActive: 0,
            }
        },
        props: ['menuData'],
        methods: {
            handleMenu(index, path) {
                this.isActive = index;
                this.path = path;
                this.openeds = [index];
                this.$router.push(path).catch(err => {
                   // console.log('输出报错',err)
                })

                setTimeout(()=> {
                    if (!document.getElementById(index).classList.contains('is-opened')) {
                        this.handleOpen(index.toString(), [index.toString()])
                    }
                }, 300)
            },
            handleOpen(key, keyPath) {
                this.openeds = [key];
            },
            setMeuActive() {
                this.menuData.map((item, index) => {
                    if (item.children && item.children.length > 0) {
                        item.children.map(it => {
                            if ((it.children && it.children.length > 0 && it.children.includes(this.name)) || it.path === this.path) {
                                this.isActive = index;
                                this.openeds = [index + 1];
                            }
                            if (this.isActive === index &&
                                document.getElementById(index.toString()).className.split(/\s+/g).indexOf('is-opened') === -1) {
                                document.getElementById(index.toString()).getElementsByTagName('div')[0].click();
                            }
                        });
                    }
                    else if (item.path === this.path){
                        this.isActive = index;
                        this.openeds = [index + 1];
                    }
                });
                if (this.openeds.length === 0) {
                    this.openeds = [this.isActive]
                }
            }
        },
        created() {
            if (this.$route.path === '/') {
                this.$route.push({path: '/overview'}).catch(err => {
                    // console.log('输出报错',err)
                })
            }
            if (!this.$route.path.includes(this.path) || this.path === '')  {
                this.path =  this.$route.path === '/' ? '/overview' : this.$route.path;
                this.name = this.$route.name;
            }
        },
        mounted() {
            this.setMeuActive();
            this.$root.Bus.$on('handleHeadMenu', () => {
                this.setMeuActive();
            });
        },
        // 在组件销毁时解除事件绑定
        beforeDestroy() {
            this.$root.Bus.$off('handleHeadMenu');
        },
        watch: {
            "$route" (to) {
                // this.path =  to.path;
                this.path =  to.path === '/' ? '/overview' : to.path;
                this.name = to.name;
            },
        },
    }
</script>

<style lang="scss" scoped>
    @import './LeftNav';
</style>
