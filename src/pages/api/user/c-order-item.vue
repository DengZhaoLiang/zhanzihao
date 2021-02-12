<template>
    <div class='c-order-item'>
        <div :class="orderItem.status === 2 ? '' : 'components-blue-header'" class='order-header'>
            <el-row class='y-center'>
                <el-col :span='16'>
                    <div class='order y-center'>
                        <img src='../../../../public/images/my/circle.png'>
                        <span class='date'>{{ orderItem.createdAt | formatDate }}</span>
                        <span>订单号：{{ orderItem.orderSn }}</span>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div :class="orderItem.status === 2 ? '' : 'components-blue-container'" class='order-container'>
            <el-row class='y-center'>
                <el-col :span='16'>
                    <div ref='left'>
                        <el-row :class="[{'products-blue-item': orderItem.status !== 2},
                                {'none-bottom-border': index === orderItem.products.length - 1}]"
                                :key='index'
                                class='y-center products-item'
                                v-for='(item, index) in orderItem.products'>
                            <el-col :span='12'>
                                <div class='products-info x-center'>
                                    <div class='master-img-div'>
                                        <img :src='item.productImage' @click="goToDetail(item.productId, 'custom')">
                                    </div>
                                    <div @click="goToDetail(item.productId, 'custom')">
                                        <span>{{ item.productName }}</span>
                                    </div>
                                </div>
                            </el-col>
                            <el-col :span='6' class='yx-center'>
                                <div class='yx-center'>
                                    <c-money :money='item.productPrice' size='sm'></c-money>
                                </div>
                            </el-col>
                            <el-col :span='6' class='xy-center'>
                                <span>{{ item.quantity }}</span>
                            </el-col>
                        </el-row>
                    </div>
                </el-col>
                <el-col :span='8' class='order-right'>
                    <div ref='right'>
                        <el-row class='order-right-row'>
                            <el-col :class="orderItem.status === 2 ? '' : 'components-col-blue-item'"
                                    :span='12'
                                    class='xy-center order-col-item'>
                                <c-money :money='orderItem.totalPrice' size='sm'></c-money>
                            </el-col>
                            <el-col :span='12' class='xy-center order-col-item order-col-item-right'>
                                <div>
                                    <div class='state-item'>
                                        <i class='iconfont icon-location'></i>
                                        <c-address-popover :address='orderItem.address || {}' class='address-popover' />
                                    </div>
                                    <div class='x-center' v-if="orderItem.status !== 2">
                                        <el-tag type="warn">未支付</el-tag>
                                    </div>
                                    <div class='x-center' v-if="orderItem.status !== 2">
                                        <el-button @click='goToOrder' class='to-pay-btn' type='primary'>去支付</el-button>
                                    </div>
                                    <div class='x-center' v-if="orderItem.status === 2">
                                        <el-tag type="success">已支付</el-tag>
                                    </div>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import CMoney from '@components/public/c-money'
    import CAddressPopover from './c-address-popover'

    export default {
        name: 'COrderItem',
        components: {
            CMoney,
            CAddressPopover
        },
        props: {
            orderItem: {
                type: Object,
                default: () => {
                    return {}
                }
            }
        },
        data() {
            return {}
        },
        methods: {
            goToDetail(productsId, type) {
                this.$router.push(`/detail?id=${productsId}&type=${type}`)
            },
            goToOrder() {
                this.$router.push(`/order?orderSn=${this.orderItem.orderSn}&totalPrice=${this.orderItem.totalPrice}`)
            }
        },
        mounted() {
            console.log(this.$refs.left.offsetHeight)
            this.$refs.right.style.height = this.$refs.left.offsetHeight + 'px'
        }
    }
</script>

<style lang='scss' scoped>
    $width: 880px;
    $background: #f5f5f5;
    $border: 1px solid #f0f0f0;
    $blue-border: 1px solid #daf3ff;
    $blue-background: #daf3ff;

    .c-order-item {
        width: $width - 2;
        margin-top: 10px;
    }

    .order-header {
        width: $width - 20 - 2;
        padding: 5px 10px;
        /*margin-top: 10px;*/
        height: 26px;
        justify-content: space-between;
        background: $background;
        font-size: 12px;
        font-family: Source Han Sans CN;
        color: rgba(102, 102, 102, 1);

        .y-center {
            height: 100%;
        }

        .order {
            font-size: 13px;
            font-weight: 300;

            .date {
                font-size: 15px;
                color: #333;
                font-weight: bold;
                margin: 0 20px 0 10px;
            }
        }
    }

    .c-del-good {
        width: 22px;
        height: 22px;
        background-image: url("../../../../public/images/cart/del.png");
        background-size: 22px 22px;
        display: flex;
        margin-left: auto;
        margin-right: 10px;

        &:hover, & :active {
            background-image: url("../../../../public/images/cart/del-active.png");
        }
    }

    .order-container {

        font-size: 18px;
        border: $border;

        .products-info {
            margin: 10px 0;

            .master-img-div {
                width: 100px;
                height: 100px;
                margin-left: 20px;

                img {
                    width: 100px;
                    height: 100px;
                }
            }

            div {
                margin-left: 10px;
                font-size: 14px;
                color: #666;

                span {
                    &:nth-child(1) {
                        font-size: 16px;
                        font-weight: bold;
                        color: #333;
                        margin-right: 10px;
                    }
                }
            }

        }

        .products-item {
            border-bottom: $border;
            border-right: $border;
        }

        .order-col-item {
            height: 100% !important;
            border-right: $border;
        }

        .order-col-item-right {
            border-right: 0;
            font-size: 16px;

            .iconfont {
                color: #ff4400;
                margin-right: 5px;
            }

            .state-item {
                margin: 8px;

                span {
                    &:hover {
                        color: #ff4400;
                        padding-bottom: 2px;
                        border-bottom: 1px solid #ff4400;
                    }
                }

                .address-popover {
                    display: inline-block;
                }
            }

            .to-pay-btn {
                width: 86px;
                margin-left: 5px;
                margin-top: 5px;
                padding: 6px 0;
            }
        }

        .order-right-row {
            height: 100%;
        }
    }

    .order-blue-right {
        border: $blue-border !important;
    }

    .products-blue-item {
        border-bottom: $blue-border !important;
        border-right: $blue-border !important;
    }

    .order-col-blue-item {
        border-right: $blue-border !important;
    }

    .order-blue-header {
        background: $blue-background !important;
    }

    .order-blue-container {
        border: $blue-border !important;
    }

    .none-bottom-border {
        border-bottom: 0 !important;
    }
</style>
