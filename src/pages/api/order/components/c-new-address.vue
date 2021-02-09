<template>
    <div class='c-new-address x-center' @click.self='showEditAddress = true'>
        <span>添加新地址</span>
        <c-edit-address :is-add='true' :is-show='showEditAddress' @hide='showEditAddress = false' />
    </div>
</template>

<script>
    import CEditAddress from '../../user/c-edit-address'

    export default {
        name: 'CNewAddress',
        components: {
            CEditAddress
        },
        data() {
            return {
                showEditAddress: false
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
    background: url("../../../../../public/images/order/border-add.png") center no-repeat;

    span {
        margin-top: 140px;
    }
}
</style>
