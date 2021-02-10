<template>
    <div class='c-good-parent xy-center'>
        <div class='c-good-item' @click='goToDetail'>
            <div class='cat-img'>
                <img :src='productsInfo.image'>
            </div>
            <div class='good-brief'>
                <div class='good-name'>
                    <span>{{ productsInfo.name }}</span>
                    <span>包邮</span>
                </div>
            </div>
            <div class='good-price'>
                <c-money :money='productsInfo.price' />
            </div>
            <div class='add-to-card xy-center'>
                <button @click.stop='addToCart'>加入购物车</button>
            </div>
        </div>
        <c-modal :is-show-cancel='true' :is-show-modal='showToast' confirm-text='去购物车' context='加入购物车成功'
                 @confirm='goToCart' @hide='showToast = false' />
    </div>
</template>

<script>
    import CMoney from '@components/public/c-money'
    import CModal from '@components/public/c-modal'

    export default {
        name: 'CGoodItem',
        components: {
            CMoney,
            CModal
        },
        data() {
            return {
                showToast: false,
                productsInfo: {},
                id: '',
                purchaseNum: 1
            }
        },
        props: {
            productsItem: {
                type: Object,
                default: () => {
                    return {}
                }
            }
        },
        watch: {
            productsItem() {
                this.productsInfo = this.productsItem
            }
        },
        methods: {
            // 去购物车
            goToCart() {
                this.$router.push('/cart')
            },
            addToCart() {
            },
            // 去详情
            goToDetail() {
                this.$router.push({ path: `/detail?id=${this.productsInfo.id}` })
            }
        },
        mounted() {
            this.productsInfo = this.productsItem
        }
    }
</script>

<style lang='scss' scoped>

.c-good-parent {
    width: 288px;
    height: 505px;
    margin-top: 10px;
}

.c-good-item {
    width: 265px;
    height: 435px;
    background: #fff;
    /*box-shadow:0 1px 0 0 rgba(221,221,221,0.75);*/
    border-radius: 8px;
    padding: 0 4px;
    /*flex-direction: column;*/
    font-family: Source Han Sans CN;
    /*border:8px solid transparent;*/
    transition: all .2s ease-out;
    -webkit-transition: all .2s ease-out;

    &:hover {
        border: 2px solid #FF7C25;
        /*margin-top: -10px;*/
        box-shadow: 0 0 5px #ff5400;
    }

    .cat-img {
        width: 260px;
        height: 258px;
        border-radius: 10px;
        display: block;
        margin: 10px auto;
        overflow: hidden;
        box-sizing: border-box;

        img {
            width: 260px;
            height: 258px;
            transition: transform 1s;

            &:hover {
                transform: scale(1.2);
            }
        }

    }

    .good-brief {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .good-name {
            display: flex;
            align-items: flex-start;

            span {
                &:nth-child(1) {
                    font-size: 24px;
                    font-weight: 400;
                    color: rgba(46, 46, 46, 1);
                }

                &:nth-child(2) {
                    display: inline-block;
                    background: #FF7C25;
                    font-size: 12px;
                    border-radius: 4px;
                    padding: 1px 5px;
                    color: #fff;
                    margin-top: 5px;
                    margin-left: 10px;
                    /*letter-spacing: 2px;*/
                }
            }
        }
    }

    .good-price {
        margin-top: 10px;
        display: flex;
        align-items: flex-end;

        .discount {
            padding-bottom: 3px;
            margin-left: 10px;
        }
    }

    .member {
        margin-top: 10px;
        display: flex;
        align-items: center;

        img {
            width: 20px;
            height: 17px;
        }

        span {
            font-size: 16px;
            color: rgba(102, 102, 102, 1);
            margin: {
                left: 10px;
                right: 37px;
            }
        }
    }

    .add-to-card {
        margin-top: 15px;
        border-top: 1px solid #ccc;

        button {
            width: 273px;
            height: 43px;
            margin-top: 15px;
            background: rgba(255, 107, 103, 1);
            border-radius: 10px;
            border: none;
            outline: none;
            color: rgba(255, 254, 254, 1);
            font-size: 20px;
        }

        button:active {
            animation: fade .8s infinite;
            -webkit-animation: fade .8s infinite;
        }
    }
}
</style>
