<template>
    <div class='order'>
        <c-head></c-head>
        <c-timeline :cur-step='step'></c-timeline>
        <div class='step-group'>
            <div class='group-1 yx-center' v-if='step === 1'>
                <div :class="(5 % 3) !== 0 ? 'fill-space' : ''" class='address-container'>
                    <c-address :address='item' :is-selected='index === selectedAddressIndex'
                               :key='index'
                               @click.native='selectedAddressIndex = index'
                               v-for='(item, index) in addressList' />
                    <c-new-address />
                </div>
                <button @click='changeStep(2)' class='button-next'>下一步</button>
            </div>
            <div class='group-2' v-if='step === 2'>
                <c-good-list :show-check-box='false' class='c-good-list' />
                <div class='btn-group1'>
                    <button @click='changeStep(1)'>返回</button>
                    <button @click='changeStep(3)'>提交订单</button>
                </div>
            </div>
            <div class='group-3 xy-center' v-if='step === 3'>
                <c-order-success :alipay='alipayWap' :is-payed='false' :order-id='orderSn' :total-amount='totalPrice' />
                <div class='btn-group2'>
                </div>
            </div>
            <div class='group-3 xy-center' v-if='step === 4'>
                <c-order-success :alipay='alipayWap' :is-payed='true' :order-id='orderSn' :total-amount='totalPrice' />
                <div class='btn-group2'>
                    <button @click='goBack'>继续购物</button>
                    <button @click='goToMy'>查看订单</button>
                </div>
            </div>
        </div>
        <div class='bottom-line'></div>
        <c-foot></c-foot>
        <c-modal :is-show-cancel='true'
                 :is-show-modal='showModal'
                 :show-close='false'
                 cancel-text='残忍离开'
                 confirm-text='去支付'
                 context='您有未支付的订单，忍心离开吗'
                 title='温馨提示'
                 v-if='showModal'
                 v-on:cancel='onCancel'
                 v-on:confirm='onConfirm'
                 width='400px' />
    </div>
</template>

<script>
    import CHead from '@components/public/c-head'
    import CFoot from '@components/public/c-foot'
    import CTimeline from './c-timeline'
    import CAddress from '@components/public/c-address'
    import CNewAddress from './c-new-address'
    import COrderSuccess from './c-order-success'
    import CGoodList from '../cart/c-good-list'
    import CModal from '@components/public/c-modal'
    import request from '@utils/request'
    import dataStore from '@utils/dataStore'

    export default {
        name: 'order',
        components: {
            CHead,
            CFoot,
            CTimeline,
            CAddress,
            CNewAddress,
            COrderSuccess,
            CGoodList,
            CModal
        },
        data() {
            return {
                step: 1,
                selectedAddressIndex: 0,
                addressList: [],
                orderSn: '', // 订单号
                totalPrice: 0, // 待支付的金额
                showModal: false,
                isPayed: false,
                userId: '',
                alipayWap: '',
                query: {
                    userId: '',
                    addressId: '',
                    products: [],
                    orderSn: '', // 订单号
                    totalPrice: 0
                }
            }
        },
        methods: {
            // 该表进度条
            changeStep(step) {
                switch (step) {
                    case 2:
                        if (!this._checkAddressIsExist()) {
                            return
                        }
                        this.fetchGoodsInfo()
                        break
                    case 3:
                        this.createOrder()
                        break
                }
                setTimeout(() => {
                    this.step = step
                }, 1000)
            },
            fetchAddressList() {
                if (this.userId === '' || typeof this.userId === 'undefined') {
                    this.$tips.error('请先登录后再试')
                    return
                }
                request.get(`/api/address/user/${this.userId}`)
                    .then(res => {
                        if (res.status === 200) {
                            this.addressList = res.data
                        } else {
                            this.$message.error(res.message)
                        }
                    })
            },
            fetchGoodsInfo() {
                let productId = this.$route.query.id
                let purchaseNum = this.$route.query.purchaseNum
                let purchaseList = this.$route.query.purchaseList
                if (typeof productId !== 'undefined' && typeof purchaseNum !== 'undefined') {
                    localStorage.setItem('buyOne', JSON.stringify({
                        productId: productId,
                        purchaseNum: purchaseNum
                    }))
                } else if (typeof purchaseList !== 'undefined' && purchaseList !== null) {
                    localStorage.setItem('purchaseList', JSON.stringify(purchaseList))
                }
            },
            createOrder() {
                let addressId = this.addressList[this.selectedAddressIndex].id
                let one = JSON.parse(localStorage.getItem('buyOne'))
                let purchaseList = JSON.parse(localStorage.getItem('purchaseList'))
                if (typeof one !== 'undefined' && one !== null) {
                    this.query.addressId = addressId
                    this.query.products = [{ productId: one.productId, purchaseNum: one.purchaseNum }]
                    this.query.userId = dataStore.userInfo.id
                    /* eslint-disable */
                    request.post(`/api/order/buy`, this.query)
                        .then(res => {
                            if (res.status === 200) {
                                let response = res.data
                                this.orderSn = response.orderSn
                                this.totalPrice = response.totalPrice
                                this.alipayWap = response.response
                            } else {
                                this.step = 2
                                this.$message.error(res.message)
                            }
                        })
                } else if (typeof purchaseList !== 'undefined' && purchaseList !== null) {
                    this.query.addressId = addressId
                    // 设置购买列表
                    purchaseList.forEach(it => {
                        this.query.products = []
                        this.query.products.push({ productId: it.id, purchaseNum: it.purchaseNum })
                    })
                    this.query.userId = dataStore.userInfo.id
                    /* eslint-disable */
                    request.post(`/api/order/buy`, this.query)
                        .then(res => {
                            if (res.status === 200) {
                                let response = res.data
                                this.orderSn = response.orderSn
                                this.totalPrice = response.totalPrice
                                this.alipayWap = response.response
                            } else {
                                this.step = 2
                                this.$message.error(res.message)
                            }
                        })
                }
            },
            onConfirm() {
                this.showModal = false
            },
            onCancel() {
                this.showModal = false
                this.goBack()
                console.log('跳转至下一步')
            },
            goToMy() {
                if (this.$route.query.orderSn) {
                    this.$router.replace('/my')
                } else {
                    this.$router.push('/my')
                }
            },
            goBack() {
                this.$router.push('/')
            },
            // 检查收获地址是否存在
            _checkAddressIsExist() {
                if (!this.addressList.length) {
                    this.$tips.error('请先添加地址')
                    return false
                }
                return true
            }
        },
        mounted() {
            this.orderSn = ''
            this.totalPrice = 0

            this.$bus.$on('getUserInfo', () => {
                this.userId = dataStore.userInfo.id
                this.fetchAddressList()
            })
            this.$bus.$on('updateAddressList', () => {
                this.userId = dataStore.userInfo.id
                this.fetchAddressList()
            })
            this.userId = dataStore.userInfo.id
            this.fetchAddressList()

            this.orderSn = this.$route.query.orderSn
            this.totalPrice = this.$route.query.totalPrice
            if ((typeof this.orderSn !== 'undefined' && this.orderSn !== '') &&
                (typeof this.totalPrice !== 'undefined' && this.totalPrice !== 0)) {
                this.query.orderSn = this.orderSn
                this.query.totalPrice = this.totalPrice
                /* eslint-disable */
                request.post(`/api/order/buy`, this.query)
                    .then(res => {
                        if (res.status === 200) {
                            let response = res.data
                            this.orderSn = response.orderSn
                            this.totalPrice = response.totalPrice
                            this.alipayWap = response.response
                            setTimeout(() => {
                                this.step = 3
                            }, 1000)
                        } else {
                            this.step = 2
                            this.$message.error(res.message)
                        }
                    })
            }

            let step = this.$route.query.step
            if (step === '4') {
                this.orderSn = this.$route.query.out_trade_no
                this.totalPrice = this.$route.query.total_amount
                if ((typeof this.orderSn !== 'undefined' && this.orderSn !== '') &&
                    (typeof this.totalPrice !== 'undefined' && this.totalPrice !== 0)) {
                    request.get(`/api/alipay/notify?orderSn=${this.orderSn}`)
                    this.step = 4
                }
            }
        },
        destroyed() {
            localStorage.removeItem('purchaseList')
        }
    }
</script>

<style lang='scss' scoped>
    .order {
        width: 100%;
        /*background: #42b983;*/
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        .bread {
            width: 100%;
            background: #F2F2F2;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .step-group {
            width: 1150px;
            padding: 0 25px;
            display: flex;
            flex-direction: column;
            flex: 1;
            margin-bottom: 20px;

            button {
                width: 183px;
                height: 45px;
                line-height: 45px;
                background: #FF4400;
                color: #fff;
                font-size: 18px;
                border-radius: 2px;
                outline: none;
                border: 0;
            }

            .button-next {
                margin-left: auto;
            }

            button:active {
                animation: fade .4s infinite;
                -webkit-animation: fade .4s infinite;
            }

            .group-2 {
                width: 1200px;
                display: flex;
                flex-direction: column;

                .c-good-list {
                    margin-top: 20px;
                }

                .btn-group1 {
                    width: 1150px;
                    display: flex;
                    justify-content: space-between;
                }
            }

            .group-3 {
                width: 100%;
                margin-top: 20px;
                display: flex;
                flex-direction: column;

                .btn-group2 {
                    width: 550px;
                    margin-top: 20px;
                    display: flex;
                    justify-content: space-between;
                }
            }

        }

        .address-container {
            width: 950px;
            margin: 20px auto;
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
        }

        .fill-space::after {
            content: "";
            width: 294px;
            height: 167px;
        }

        .down-more {
            width: 950px;
            margin: 0 auto 20px auto;
            text-align: left;
            font-size: 14px;
            font-weight: 300;
            color: rgba(136, 136, 136, 1);

            img {
                margin-left: 5px;
                width: 12px;
                height: 7px;
            }
        }
    }

</style>
