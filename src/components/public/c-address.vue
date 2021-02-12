<template>
    <div :class="isSelected ? 'selected-address' : ''" class='c-address'>
        <div class='up-side'>
            <div>
                <span>{{ address.name || '' }}</span>
            </div>
            <div>
                <img @click='showDel' src='../../../public/images/order/cancel.svg' />
            </div>
        </div>
        <div class='down-side'>
            <div>
                <img src='../../../public/images/order/location.svg' />
                <span>{{ address.detail | formatString(14) }}</span>
            </div>
            <div>
                <img src='../../../public/images/order/phone.svg' />
                <span>{{ address.phone || '' }}</span>
            </div>
        </div>
        <c-modal :context="'是否删除这个地址？'" :is-show-cancel='true' :is-show-modal='isShowDel' @confirm='deleteAddress'
                 @hide='onHide' />
    </div>
</template>

<script>
    import CModal from './c-modal.vue'
    import request from '@utils/request'

    export default {
        name: 'CAddress',
        components: {
            CModal
        },
        props: {
            isSelected: {
                type: Boolean,
                default: false
            },
            address: Object
        },
        data() {
            return {
                isShowDel: false
            }
        },
        methods: {
            showDel() {
                this.isShowDel = true
            },
            onHide() {
                this.isShowDel = false
            },
            deleteAddress() {
                request.delete(`/api/address/${this.address.id}`)
                    .then(res => {
                        if (res.status === 200) {
                            this.$message.success('删除成功')
                            this.$bus.$emit('updateAddressList')
                        } else {
                            this.$message.error(res.message)
                        }
                    })
            }
        }
    }
</script>

<style lang='scss' scoped>
    .c-address {
        width: 266px;
        height: 145px;
        margin-top: 20px;
        font-family: Source Han Sans CN;
        // border: 1px solid #ccc;
        padding: 11px 14px;
        border-radius: 2px;
        background: url("../../../public/images/order/border-0.png") center no-repeat;

        .up-side {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;

            div {
                &:nth-child(1) {
                    display: flex;
                    align-items: flex-end;

                    img {
                        width: 62px;
                        height: 62px;
                        border-radius: 100%;
                    }

                    span {
                        margin-left: 20px;
                        font-size: 30px;
                        color: #666666;
                    }
                }

                &:nth-child(2) {
                    display: flex;
                    height: 16px;

                    img {
                        margin-left: 10px;
                        width: 16px;
                        height: 16px;
                    }
                }
            }
        }

        .down-side {
            margin-top: 27px;
            font-size: 14px;
            font-weight: 300;
            color: #666;

            span {
                margin-left: 12px;
            }

            div {
                margin-bottom: 18px;
                display: flex;
                align-items: center;
                background: center no-repeat;
            }
        }
    }

    .selected-address {
        background: url("../../../public/images/order/border-1.png") center no-repeat;
    }
</style>
