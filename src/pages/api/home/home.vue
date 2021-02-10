<template>
    <div class='home'>
        <c-head></c-head>
        <div class='products-list-container'>
            <div class='products-list'>
                <div v-if='productsList.length' :class="(productsList.length % 5) !== 0 ? 'fill-space' : ''"
                     class='good-container'>
                    <c-good-item v-for='(item, key) in productsList' :key='key' :products-item='item' />
                </div>
                <div v-infinite-scroll='loadMore' class='load-infinite infinite-list'
                     infinite-scroll-disabled='busy' infinite-scroll-distance='10'>
                    <img v-show='loading' src='../../../assets/loading-svg/dual-ball-gray.svg' />
                </div>
            </div>
        </div>
        <c-foot />
    </div>
</template>

<script>
    import CHead from '@components/public/c-head'
    import CFoot from '@components/public/c-foot'
    import CGoodItem from './c-good-item'
    import request from '@utils/request'

    export default {
        name: 'home',
        components: {
            CHead,
            CFoot,
            CGoodItem
        },
        data() {
            return {
                isShowModal: true,
                productsList: [],
                loading: false,
                busy: false,
                load: true, // 是否继续加载
                query: {
                    page: 0,
                    size: 5
                }
            }
        },
        mounted() {
            this.$bus.$on('login', () => {
                // 待处理
            })
        },
        methods: {
            // 是否重置
            getGoodsList(isReset = false) {
                if (isReset) {
                    this.query.page = 0
                    this.productsList = []
                } else {
                    request.get('api/product', this.query)
                        .then(res => {
                            if (res.status === 200) {
                                let products = res.data.content
                                if (products.length) {
                                    this.productsList = this.productsList.concat(products)
                                } else {
                                    this.load = false
                                }
                            }
                        }).catch(err => {
                            console.log(err)
                            this.load = false
                        })
                }
                this.loading = false
                this.busy = false
            },
            loadMore() {
                if (this.load) {
                    this.busy = true
                    this.loading = true
                    setTimeout(() => {
                        this.query.page++
                        this.getGoodsList()
                    }, 500)
                }
            }
        },
        destroyed() {
        }
    }
</script>

<style lang='scss' scoped>
.home {
    width: 100%;
    background: rgba(246, 246, 246, 1);
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

    .products-list-container {
        width: 100%;
        display: flex;
        justify-content: left;
        margin-left: 250px;
        margin-top: 10px;

        .products-list {
            display: flex;
            flex-direction: column;

            .sort-container {
                width: 920px;
                height: 53px;
                margin-left: 26px;
                justify-content: flex-end;
                background: #fff;

                .products-sort {
                    margin-right: 30px;
                }
            }

            .good-container {
                width: 1560px;
                margin-left: 26px;
                display: flex;
                justify-content: space-between;
                flex-wrap: wrap;
            }

            .fill-space:after {
                content: "";
                width: 288px;
                height: 496px;
            }

            .paging {
                margin: 0 auto;
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
</style>
