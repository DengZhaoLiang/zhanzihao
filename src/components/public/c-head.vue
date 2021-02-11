<template>
    <div class='c-head'>
        <div class='container'>
            <div class='head-left'>
                <img src='./../../../public/images/public/logo.png'>
                <div class='head-text xy-center'>
                    <span>ORANGE</span>
                    <span></span>
                </div>
            </div>
            <div class='head-right'>
                <c-header-image v-if='userInfo.id' />
                <div v-else>
                    <el-button class='head-right-btn' type='primary' @click='showLogin(true)'>登录</el-button>
                    <el-button class='head-right-btn' type='primary' @click='showLogin(false)'>注册</el-button>
                </div>
                <c-card :card-number='cardNumber' class='card'></c-card>
            </div>
        </div>
        <c-banner></c-banner>
        <c-login :is-login='isLogin' :show-login='isShowLogin' @changeMode='onChangeMode' @hide='closeLogin'></c-login>
    </div>
</template>

<script>
    import CLogin from './c-login'
    import CCard from './c-cart'
    import CBanner from './c-banner'
    import CHeaderImage from './c-header-image'

    export default {
        name: 'CHead',
        components: {
            CLogin,
            CCard,
            CBanner,
            CHeaderImage
        },
        data() {
            return {
                isShowLogin: false,
                isLogin: true,
                cardNumber: 2
            }
        },
        computed: {
            userInfo() {
                return this.$store.getters.getUserInfo
            }
        },
        methods: {
            showLogin(type) {
                this.isLogin = type
                this.isShowLogin = true
            },
            closeLogin() {
                this.isShowLogin = false
            },
            // 改变登录模式
            onChangeMode(mode) {
                this.isLogin = mode
            },
            // 监听登录事件
            onLogin() {
                this.isShowLogin = true
            }
        },
        mounted() {
            this.$bus.$on('login', () => {
                this.onLogin()
            })
        }
    }
</script>

<style lang='scss' scoped>
.c-head {
    background: rgba(246, 246, 246, 1);
    width: 100%;

    .container {
        height: 89px;
        justify-content: space-between;
    }

    .head-left {
        display: flex;

        img {
            width: 58px;
            height: 58px;
            margin-left: 5px;
        }

        .head-text {
            flex-direction: column;
            margin-left: 12px;

            span:nth-child(1) {
                color: rgba(255, 68, 0, 1);
                font-size: 40px;
                line-height: 40px;
                font-family: DFPHaiBaoW12-GB;
            }

            span:nth-child(2) {
                font-size: 22px;
                line-height: 22px;
                font-family: FZMiaoWuS-GB;
                color: rgba(253, 120, 72, 1);
                margin: 0;
            }

        }

    }

    .head-right {
        display: flex;
        align-items: center;

        .head-right-btn {
            width: 101px;
            height: 40px;
            border-radius: 8px;
            background: #FF7C25;
            border: none;
            margin-right: 10px;

            :hover {
                opacity: .4;
            }

        }

        .card {
            margin-right: 10px;
        }

    }
}
</style>
