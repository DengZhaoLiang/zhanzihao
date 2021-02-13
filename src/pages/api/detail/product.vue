<template>
    <div class='detail'>
        <c-head></c-head>
        <div class='detail-container'>
            <div class='detail-left'>
                <c-image-picker :img='product.image' v-if='product' />
            </div>
            <div class='detail-center'>
                <div class='up-side'>
                    <div class='good-name'>{{ product.name }}</div>
                    <div class='discount-price y-center'>
                        <span>价格：</span>
                        <c-money :money='product.price' />
                    </div>
                    <div class='good-num y-center__between' style='margin-top: 200px'>
                        <c-input-number @change='onPurchaseNum' />
                        <span>库存：{{ product.inventory }}</span>
                    </div>
                </div>
                <div class='down-side y-center__between'>
                    <el-button :disabled='!product.inventory' @click='goToOrder'>立即购买</el-button>
                    <el-button @click='addToCart'>加入购物车</el-button>
                </div>
            </div>
        </div>
        <div class='detail-bottom-line'></div>
        <c-foot></c-foot>
        <c-modal :is-show-cancel='true' :is-show-modal='showToast' @confirm='goToCart' @hide='showToast = false'
                 confirm-text='去购物车' context='加入购物车成功' />
    </div>
</template>

<script>
    import CHead from '@components/public/c-head'
    import CFoot from '@components/public/c-foot'
    import CMoney from '@components/public/c-money'
    import CModal from '@components/public/c-modal'
    import CInputNumber from '@components/public/c-input-number'
    import CImagePicker from './c-image-picker'
    import request from '@utils/request'

    export default {
        name: 'detail',
        components: {
            CHead,
            CFoot,
            CMoney,
            CInputNumber,
            CImagePicker,
            CModal
        },
        data() {
            return {
                isShowModal: false,
                product: {},
                showToast: false,
                cartInfo: {
                    id: '',
                    product: {},
                    purchaseNum: 1
                },
                purchaseNum: 1
            }
        },
        methods: {
            // 监听购买数量
            onPurchaseNum(num) {
                this.purchaseNum = num
            },
            goToCart() {
                this.$router.push('/cart')
            },
            // 去下单
            goToOrder() {
                this.$router.push(`/order?id=${this.product.id}&purchaseNum=${this.purchaseNum}`)
            },
            addToCart() {
                this.cartInfo.id = this.product.id
                this.cartInfo.product = this.product

                let old = this.$store.state.Carts ? this.$store.state.Carts : []
                let append = true
                old.forEach((cur, index) => {
                    if (cur.id === this.cartInfo.id) {
                        old[index].purchaseNum = old[index].purchaseNum + this.purchaseNum
                        append = false
                    }
                })
                if (append) {
                    old.push(this.cartInfo)
                }

                this.$store.dispatch('setCarts', old)
                this.showToast = true
            }
        },
        created() {
            if (typeof this.$route.query.id !== 'undefined') {
                request.get(`/api/product/${this.$route.query.id}`)
                    .then(res => {
                        if (res.status === 200) {
                            this.product = res.data
                        } else {
                            this.$message.error(res.message)
                        }
                    })
            }
        }
    }
</script>

<style lang='scss' scoped>
    .detail {
        width: 100%;
        /*background: #F2F2F2;*/
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        font-family: Source Han Sans CN;

        .bread {
            width: 100%;
            background: #F2F2F2;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }

    .detail-container {
        width: 1160px;
        margin-top: 20px;
        padding: 0 20px;
        display: flex;
    }

    .detail-center {
        margin-left: 30px;
        display: flex;
        flex-direction: column;

        .up-side {
            .good-name {
                font-size: 24px;
                color: #1B251F;
                font-family: Adobe Heiti Std R;
                font-weight: bold;
            }

            .good-describe {
                margin-top: 18px;
                font-size: 18px;
                color: #FF7C25;

                .y-center {
                    margin-left: 34px;
                    color: #646A7C;
                    font-size: 12px;
                    font-family: Source Han Sans CN;

                    image {
                        width: 14px;
                        height: 14px;
                        display: flex;
                    }

                    span {
                        margin-left: 10px;
                    }
                }
            }

            .primary-price, .discount-price, .good-discount {
                font-size: 21px;
                font-family: Source Han Sans CN;
                color: #333;
                margin-top: 26px;
                height: 20px;
            }

            .post-address {
                width: 370px;
                margin-top: 20px;

                div {
                    width: 200px;

                    span {
                        font-size: 24px;
                        color: #333;

                        &:nth-child(2) {
                            color: #FF4400;
                            font-size: 18px;
                        }
                    }
                }

                span {
                    &:nth-last-child(2) {
                        font-size: 26px;
                        color: #ddd;
                    }

                    &:nth-last-child(1) {
                        font-size: 22px;
                        color: #333
                    }
                }
            }

            .good-num {
                margin-top: 28px;
                width: 250px;
            }

        }

        .mid-side {
            $border: 1px solid #EEEBE7;
            display: flex;
            margin-top: 46px;
            width: 571px;
            padding: 10px 0;
            border-top: $border;
            border-bottom: $border;

            .xy-center {
                width: 33.3%;
                border-right: $border;
                font-size: 18px;

                span {
                    &:nth-child(1) {
                        color: #B2B2B2;
                    }

                    &:nth-last-child(1) {
                        margin-left: 13px;
                        color: #ff4400;
                    }
                }
            }

            .mid_last {
                border-right: 0;
            }
        }

        .down-side {
            width: 500px;
            margin-top: 40px;

            button {
                width: 183px;
                height: 45px;
                padding: 0 !important;
                line-height: unset;
                background: #FF4400;
                color: #fff;
                font-size: 18px;
                border: 0;
                outline: none;

                &:active {
                    animation: fade .4s infinite;
                    -moz-animation: fade .4s infinite;
                }

                &:disabled {
                    opacity: .6;
                }
            }
        }

    }

    .c-progress {
        margin-top: 20px;
    }

    .detail-bottom-line {
        margin-top: 10px;
        width: 100%;
        height: 10px;
        background: #f2f2f2;
    }
</style>
