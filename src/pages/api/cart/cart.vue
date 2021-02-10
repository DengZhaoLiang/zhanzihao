<template>
    <div class='card'>
        <c-head></c-head>
        <div v-if='isLoadedCartList'>
            <c-good-list v-if='cartList.length' :is-show-account='true'></c-good-list>
            <div v-else class='none-data yx-center'>
                <img src='../../../../public/images/cart/none-data.svg'>
                <span>购物车暂无数据，赶快去逛逛吧~</span>
            </div>
        </div>
        <div v-infinite-scroll='loadMore' class='load-infinite infinite-list'
             infinite-scroll-disabled='busy' infinite-scroll-distance='10'>
            <img v-show='loading' src='../../../assets/loading-svg/dual-ball.svg'>
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
            loadMore() {
                this.busy = true
                this.loading = true
                setTimeout(() => {
                    this.getCartList()
                }, 500)
            },
            // 向商品列表中加入购买数量
            _addNumToGoodsList(product) {
                this.cartList.forEach(item => {
                    item = Object.assign(item, product.find(elem => item.productsId === elem.productsId))
                })
                this.$store.dispatch('setCarts', this.cartList)
            },
            _getGoodsIdList(arr) {
                const temp = []
                arr.forEach(item => {
                    temp.push(item.productsId)
                })
                return temp
            }
        },
        mounted() {
            this.getCartList()
            this.$bus.$on('getCartList', (isDel = false) => {
                this.getCartList(true, isDel)
            })
        },
        destroyed() {
            this.$store.dispatch('setCarts', [])
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
