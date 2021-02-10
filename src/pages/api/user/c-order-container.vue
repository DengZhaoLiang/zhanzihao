<template>
    <div class='c-order-container'>
        <el-row class='order-title'>
            <el-col :span='8' class='x-center'>宝贝</el-col>
            <el-col :span='4' class='x-center'>单价</el-col>
            <el-col :span='4' class='x-center'>数量</el-col>
            <el-col :span='4' class='x-center'>实付款</el-col>
            <el-col :span='4' class='x-center'>订单状态</el-col>
        </el-row>
        <c-order-item v-for='(item,index) in orderList' :key='index' :order-item='item' @del='reGetOrderList(true)' />
        <div v-if='isLoaded && !orderList.length' class='none-data yx-center'>
            <img src='../../../../public/images/my/none-data.svg'>
            <span>暂无订单数据，赶快去下单吧~</span>
        </div>
        <div v-infinite-scroll='loadMore' class='load-infinite infinite-list'
             infinite-scroll-disabled='busy' infinite-scroll-distance='10'>
            <img v-show='loading' src='../../../assets/loading-svg/dual-ball.svg'>
        </div>
    </div>
</template>

<script>
    import COrderItem from './c-order-item'

    export default {
        name: 'COrderContainer',
        components: {
            COrderItem
        },
        data() {
            return {
                orderList: [],
                loading: false,
                busy: false,
                isLoaded: false
            }
        },
        methods: {
            fetchOrderList(isClearArr = false, isDel = false) {

            },
            loadMore() {
                console.log('自动地加载')
                this.busy = true
                this.loading = true
                setTimeout(() => {
                    // ++pGetCartList.curPage
                    this.fetchOrderList()
                }, 500)
            },
            // 重新获取订单，监听订单被删除的情况
            reGetOrderList(isDel = false) {
                console.log('重置订单')
                this.busy = false
                this.loading = false
                this.fetchOrderList(true, isDel)
            }
        },
        mounted() {
            this.fetchOrderList()
        },
        destroyed() {
        }
    }
</script>

<style lang='scss' scoped>
$width: 880px;
$background: #f5f5f5;

.c-order-container {
    width: $width;

    .order-title {
        background: $background;
        color: #333;
        font-size: 16px;
        padding: 8px 0;
        margin-bottom: 10px;
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

.none-data {
    margin-top: 80px;

    span {
        margin-top: 20px;
        font-size: 16px;
        color: #aaa;
        font-weight: 300;
    }
}
</style>
