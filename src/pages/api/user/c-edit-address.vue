<template>
    <div class='c-edit-address' v-if='isShow'>
        <c-modal :is-custom='true' :is-show-confirm='false'
                 :is-show-modal='isShow' :title="'编辑收货地址'" :width="'640px'" @hide='hide' bg-color='#fff'>
            <div class='edit-address' slot='custom'>
                <el-form :model='address' :rules='rules' class='demo-ruleForm' label-width='100px'>
                    <el-form-item label='联系人' prop='name'>
                        <el-input v-model='address.name'></el-input>
                    </el-form-item>
                    <el-form-item label='联系方式' prop='phone'>
                        <el-input v-model='address.phone'></el-input>
                    </el-form-item>
                    <el-form-item class='detail-address' label='详细地址' prop='detail'>
                        <el-input v-model='address.detail'></el-input>
                    </el-form-item>
                </el-form>
                <button @click='submitForm()' class='save'>保存</button>
            </div>
        </c-modal>
    </div>
</template>

<script>
    import CModal from '@components/public/c-modal'
    import request from '@utils/request'

    export default {
        name: 'CEditAddress',
        components: {
            CModal
        },
        props: {
            isShow: {
                type: Boolean,
                default: false
            }
        },
        data() {
            const validatePhone = (rule, value, callback) => {
                const reg = /^[0-9(\-)]{5,11}$/
                if (!reg.test(value)) {
                    callback(new Error('长度11个字符，电话号码不正确'))
                } else {
                    callback()
                }
            }
            return {
                address: {},
                rules: {
                    name: [{
                        required: true, message: '请输入收货人姓名', trigger: 'blur'
                    }],
                    phone: [{
                        required: true, message: '请输入您的联系电话', trigger: 'blur'
                    }, {
                        validator: validatePhone, trigger: 'blur'
                    }],
                    detail: [{
                        required: true, message: '请输入您的详细地址', trigger: 'blur'
                    }]
                }
            }
        },
        watch: {},
        methods: {
            hide() {
                console.log('hide')
                this.$emit('hide')
            },
            submitForm() {
                this.addAddress()
            },
            addAddress() {
                this.address.userId = this.$store.getters.getUserInfo.id
                request.post('/api/address', this.address)
                    .then(res => {
                        if (res.status === 200) {
                            this.$bus.$emit('updateAddressList', true)
                        } else {
                            this.$message.error(res.message)
                        }
                    })
                this.$emit('hide')
            }
        },
        mounted() {
        }
    }
</script>

<style lang='scss'>

    .edit-address {
        display: flex;
        flex-direction: column;
        margin: {
            top: 20px;
            bottom: 20px;
        }
        width: 560px;
        /*height: 400px;*/
        padding: 0 20px;
        background: #fff;

        .save {
            width: 200px;
            height: 50px;
            line-height: 50px;
            color: #fff;
            border-radius: 8px;
            background: #ff6900;
            border: 0;
            outline: none;
            font-size: 22px;
            margin: {
                top: 60px;
                left: auto;
                right: auto;
            };
        }

        .el-form-item {
            display: flex;
            margin-bottom: 25px !important;
            /*border-bottom: 1px solid #DCDFE6;*/

            .el-form-item__label {
                font-weight: bold;
            }

            .el-form-item__error {
                padding-top: 6px;
            }

            .el-form-item__content {
                margin-left: 0 !important;

                .el-input {
                    .el-input__inner {
                        width: 200px;
                        height: 35px;
                        line-height: 35px;
                        border-radius: 2px;
                    }
                }
            }
        }

        .detail-address {
            .el-input {
                .el-input__inner {
                    width: 400px !important;
                }
            }
        }
    }

    .el-cascader__dropdown {
        .el-cascader-menu {
            min-width: 150px !important;
        }
    }

</style>
