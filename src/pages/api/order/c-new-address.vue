<template>
    <div @click.self='show' class='c-new-address x-center'>
        <span>添加新地址</span>
        <c-edit-address :is-add='true' :is-show='showEditAddress' @hide='showEditAddress = false' />
    </div>
</template>

<script>
    import CEditAddress from '../user/c-edit-address'

    export default {
        name: 'CNewAddress',
        components: {
            CEditAddress
        },
        data() {
            return {
                showEditAddress: false
            }
        },
        methods: {
            show() {
                let id = this.$store.getters.getUserInfo.id
                if (id === '' || typeof id === 'undefined') {
                    this.$tips.error('请先登录后再试')
                    return
                }
                this.showEditAddress = true
            }
        }
    }
</script>

<style lang='scss' scoped>
    .c-new-address {
        width: 294px;
        height: 167px;
        margin-top: 20px;
        font-family: Source Han Sans CN;
        font-size: 14px;
        font-weight: 300;
        color: #666;
        background: url("../../../../public/images/order/border-add.png") center no-repeat;

        span {
            margin-top: 140px;
        }
    }
</style>
