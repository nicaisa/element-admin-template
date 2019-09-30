<template>
    <div>登录
    </div>

</template>

<script>
    /*登录*/
    export default {
        name: "Login",
        mounted() {
            console.log('登录')
            this.$router.push('/overview')
        }
    }
</script>

<style scoped>

</style>
