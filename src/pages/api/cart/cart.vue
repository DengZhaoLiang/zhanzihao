<template>
    <div class='card'>
        <c-head></c-head>
        <div v-if='isLoadedCartList'>
            <c-good-list :is-show-account='true' v-if='cartList.length'></c-good-list>
            <div class='none-data yx-center' v-else>
                <img src='../../../../public/images/cart/none-data.svg'>
                <span>购物车暂无数据，赶快去逛逛吧~</span>
            </div>
        </div>
        <div class='load-infinite infinite-list' infinite-scroll-disabled='busy'
             infinite-scroll-distance='10' v-infinite-scroll='loadMore'>
            <img src='../../../assets/loading-svg/dual-ball.svg' v-show='loading'>
        </div>
        <c-foot class='cart-foot'></c-foot>
    </div>
</template>

<script>
    import CHead from '@components/public/c-head'
    import CFoot from '@components/public/c-foot'
    import CGoodList from './c-good-list'

    export default {
        name: 'cart',
        components: {
            CHead,
            CFoot,
            CGoodList
        },
        data() {
            return {
                cartList: [],
                loading: false,
                busy: false,
                isLoadedCartList: false
            }
        },
        methods: {

            // 是否清理数组，清理就置空数组看
            getCarts() {
                this.cartList = this.$store.state.Carts ? this.$store.state.Carts : []
                console.log(this.cartList)
                this.loading = false
                this.busy = false
                this.isLoadedCartList = true
            },
            loadMore() {
                if (this.isLoadedCartList === false) {
                    this.loading = true
                    this.busy = true
                    this.getCarts()
                }
            }
        },
        created() {
            this.$bus.$on('getCarts', () => {
                this.getCarts()
            })
        }
    }
</script>

<style lang='scss' scoped>
    .card {
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
            flex-direction: column;
            padding: 10px 0;

            .card-title {
                width: 1200px;
                height: 53px;
                font-size: 16px;
                font-family: Source Han Sans CN;
                color: rgba(102, 102, 102, 1);
                background: #fff;

                span {
                    margin-left: 10px;
                }

            }
        }

    }

    .load-infinite {
        margin-top: 50px;
        height: 100px;
        text-align: center;

        img {
            width: 50px;
            height: 50px;
        }
    }

    .cart-foot {
        border-top: 10px solid #f0f0f0;
    }

    .none-data {
        margin-top: 80px;

        span {
            font-size: 16px;
            color: #aaa;
            font-weight: 300;
        }
    }
</style>
