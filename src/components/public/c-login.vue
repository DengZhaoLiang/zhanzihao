<template>
    <div class='login xy-center'>
        <el-dialog
            :title="isLogin ? '登录' : isResetPassword ? '重置密码' : '注册'"
            :visible.sync='dialogVisible'
            width='300px'>
            <div>
                <el-input
                    v-model='input.email'
                    placeholder='请输入邮箱'>
                    <img slot='prefix' src='./../../../public/images/public/email.png' />
                </el-input>
                <div v-show='errTip[0]' class='err-tip'>
                    <i class='el-icon-warning'>邮箱格式不正确</i>
                </div>
                <el-input
                    v-model='input.password'
                    :type="isShowPwd ? 'text' : 'password'"
                    placeholder='请输入新密码'>
                    <img slot='prefix' src='./../../../public/images/public/pwd.png' />
                    <img slot='suffix' :src='require(`./../../../public/images/public/show${isShowPwd}.png`)'
                         @click='isShowPwd = !isShowPwd' />
                </el-input>
                <div v-show='errTip[1]' class='err-tip'>
                    <i class='el-icon-warning'>账号密码格式不正确</i>
                </div>
                <el-input v-if='!isLogin'
                          v-model='input.repeatPwd'
                          :type="isShowPwd ? 'text' : 'password'"
                          placeholder='请再次输入密码'>
                    <img slot='prefix' src='./../../../public/images/public/pwd.png' />
                    <img slot='suffix' :src='require(`./../../../public/images/public/show${isShowPwd}.png`)'
                         @click='isShowPwd = !isShowPwd' />
                </el-input>
                <div v-show='errTip[2]' class='err-tip'>
                    <i class='el-icon-warning'>两次密码不一致</i>
                </div>
                <div class='yx-center'>
                    <el-button round @click='submit'>{{ isLogin ? '登录' : '注册' }}</el-button>
                    <div class='footer-btn'>
                        <el-button type='text' @click='changeMode'>立即{{ isLogin ? '注册' : '登录' }}</el-button>
                    </div>
                </div>
            </div>
        </el-dialog>
        <c-modal :context="isLogin ? '登录成功' : '注册成功'" :is-show-cancel='false' :is-show-modal='showToast'
                 @hide='showToast = false' />
    </div>
</template>

<script>
    import CModal from './c-modal'
    import { testEmail, testPassword } from '@utils/utils'
    import request from '@utils/request'

    export default {
        name: 'CLogin',
        components: { CModal },
        data() {
            return {
                dialogVisible: this.showLogin,
                showToast: false,
                isShowPwd: false, // 是否显示密码
                errTip: [false, false, false, false], // 错误提示
                time: 60,
                getting: false,
                input: {
                    email: '',
                    password: '',
                    repeatPwd: '',
                    verifyCode: ''
                }
            }
        },
        props: ['showLogin', 'isLogin'],
        watch: {
            // 清除出错的提示
            'input.email': function() {
                this.$set(this.errTip, 0, false)
            },
            'input.password': function() {
                this.$set(this.errTip, 1, false)
            },
            'input.repeatPwd': function() {
                this.$set(this.errTip, 2, false)
            },
            'input.verifyCode': function() {
                this.$set(this.errTip, 3, false)
            },
            showLogin: function(val) {
                if (val) {
                    this.dialogVisible = val
                }
            },
            dialogVisible: function(val) {
                if (!val) {
                    this.$emit('hide')
                }
            }
        },
        mounted() {

        },
        methods: {
            submit() {
                if (!testEmail(this.input.email)) {
                    this.$set(this.errTip, 0, true)
                    return
                }
                if (!testPassword(this.input.password)) {
                    this.$set(this.errTip, 1, true)
                    return
                }
                if (!this.isLogin && (this.input.repeatPwd !== this.input.password)) {
                    this.$set(this.errTip, 2, true)
                    return
                }
                this.isLogin ? this.login() : this.registerOrResetPassword()
            },
            // 切换模式
            changeMode() {
                this.isResetPassword = false
                this.$emit('changeMode', !this.isLogin)
            },
            // 登录
            login() {
                request.post('/api/user/login', this.input)
                    .then(res => {
                        if (res.status === 200) {
                            let user = res.data
                            console.log(user)
                            this.$store.dispatch('saveUserInfo', user)
                            this.$bus.$emit('login')
                        } else {
                            this.$message.error(res.message)
                        }
                        this._hideLoginModal()
                    })
            },
            // 注册
            registerOrResetPassword() {
                request.post('/api/user/register', this.input)
                    .then(res => {
                        if (res.status === 200) {
                            this.showToast = true
                        } else {
                            this.$message.error(res.message)
                        }
                        this._hideLoginModal()
                    })
            },
            fetchBalance() {
            },
            // 隐藏登录模态框
            _hideLoginModal() {
                this.dialogVisible = false
                this.$emit('hide')
            }
        }
    }
</script>

<style lang='scss'>
.login {

    .el-dialog__header {
        text-align: center;
    }

    .el-dialog {
        border-radius: 10px;
    }

    .el-dialog__title {
        font-size: 26px;
    }

    .el-input {
        input {
            border: none;
            border-bottom: 1px solid #ccc;
            color: #ee4400;
            margin-bottom: 15px;
            font-size: 16px;
            border-radius: 0;
        }

        img {
            width: 22px;
            height: 22px;
            padding-top: 7px;
        }

        .el-input__inner {
            padding-left: 40px;
        }

        .get-verify-code {
            margin-top: 4px;
            background: #ff4400;
            color: #fff;
            padding: 8px 10px;
            font-size: 12px;
            border-radius: 20px;
            display: inline-block;
            border: none;
            outline: none;

            &:active {
                animation: fade .6s infinite;
                -moz-animation: fade .6s infinite;
            }
        }

        .get-verify-code-span {
            padding: 10px 0;
            font-size: 14px;
            color: #ff4400;
            display: inline-block;
        }
    }

    .el-button.is-round {
        width: 85%;
        margin-top: 15px;
        background: #ff6900;
        color: #fff;
        outline: none;
        font-size: 18px;

        &:active {
            border: 1px solid #ff6900;
        }

    }

    .footer-btn {
        width: 85%;
        display: flex;
        justify-content: space-between;
        margin: {
            top: 10px;
            bottom: -20px;
            left: auto;
            right: auto;
        };

        .el-button--text {
            color: #ff4400;
        }
    }

    .err-tip {
        text-align: left;
        margin-bottom: 2px;
        margin-top: -5px;
        padding-left: 8px;
        color: #F56C6C;
    }

}
</style>
