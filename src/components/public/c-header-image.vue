<template>
    <div class='c-header-image'>
        <el-dropdown>
            <div>
                <img :src='(getUserInfo.avatar)'>
            </div>
            <el-dropdown-menu slot='dropdown' class='c-dropdown'>
                <el-dropdown-item>邮箱：{{ (getUserInfo ? getUserInfo.email : '') | formatString(18) }}</el-dropdown-item>
                <el-dropdown-item>昵称：{{ (getUserInfo ? getUserInfo.name : '') | formatString(18) }}
                </el-dropdown-item>
                <el-dropdown-item divided @click.native='goToPersonal'>我的主页</el-dropdown-item>
                <el-dropdown-item divided @click.native='logout'>登出</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
    import dataStore from '@utils/dataStore'

    export default {
        name: 'CHeaderImage',
        computed: {
            getUserInfo() {
                return this.$store.getters.getUserInfo
            }
        },
        components: {},
        data() {
            return {}
        },
        methods: {
            logout() {
                dataStore.deleteToken()
                this.$store.dispatch('saveUserInfo', null)
                this.$store.dispatch('setCarts', null)
                if (this.$route.path !== '/') {
                    this.$router.replace('/')
                }
            },
            goToPersonal() {
                if (this.$route.path !== '/my') {
                    this.$router.push('/my')
                }
            }
        }
    }
</script>

<style lang='scss' scoped>
.c-header-image {
    img {
        width: 50px;
        height: 50px;
        border-radius: 100%;
        margin-top: 8px;
        margin-right: 10px;
    }
}

.c-dropdown {
    width: 240px;
}

.recharge {
    width: 50px;
    margin-left: auto;
    padding: 4px 0;
}

</style>
