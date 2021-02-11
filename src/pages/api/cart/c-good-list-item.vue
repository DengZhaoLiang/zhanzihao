<template>
    <div class='c-good-list-item'>
        <div>
            <el-checkbox-group v-model='checkedGoods' @change='handleCheckedGoodsChange'>
                <div v-for='(item,key) in getcarts' :key='key' class='c-row-container'>
                    <el-row class='c-row'>
                        <el-col v-if='showCheckBox' :span='isShowAccount ? 1 : 2'>
                            <el-checkbox :label='item.id'></el-checkbox>
                        </el-col>
                        <el-col :span='4'>
                            <img :src='item.product.image'>
                        </el-col>
                        <el-col :span='4'>
                            <div class='c-good-name'>{{ item.product.name }}</div>
                        </el-col>
                        <el-col :span='4'>
                            <div class='yx-center'>
                                <c-money :money='item.product.price' size='sm'></c-money>
                            </div>
                        </el-col>
                        <el-col :span='4'>
                            <c-input-number v-if='isShowAccount' :index='key' :num='item.purchaseNum'
                                            @change='onInputChange' />
                            <span v-else class='account-num'>{{ item.purchaseNum }}</span>
                        </el-col>
                        <el-col :span='isShowAccount ? 5 : 6' class='yx-center'>
                            <c-money :money='item.product.price * (item.purchaseNum)'
                                     size='sm'></c-money>
                        </el-col>
                        <el-col v-if='isShowAccount' :span='2'>
                            <div class='c-del-good' @click='showDelModal(item.id)'>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </el-checkbox-group>
        </div>
        <!-- 商品汇总 -->
        <div class='checkout'>
            <div v-if='isShowTotal' class='c-total-container'>
                <p>普通商品&nbsp;<span>{{ checkedGoods.length }}&nbsp;</span>件</p>
                <div class='total-container xy-center'>
                    <img class='arrow-left' src='../../../../public/images/cart/left.png'
                         @click="loadMoreImg('left')">
                    <div class='img-container xy-center'>
                        <img v-for='(item,key) in getImgList'
                             :key='key'
                             :src='item'>
                    </div>
                    <img class='arrow-right' src='../../../../public/images/cart/right.png'
                         @click="loadMoreImg('right')">
                </div>
            </div>
            <!-- 全选 -->
            <div v-if='isShowAccount' class='selected-all xy-center'>
                <el-checkbox v-model='checkAll' :indeterminate='isIndeterminate' class='c-all-checkbox xy-center'
                             @change='handleCheckAllChange'>全选
                </el-checkbox>
                <div class='selected-right xy-center'>
                    <div class='select-num xy-center'>
                        <p>已选商品&nbsp;<span>{{ checkedGoods.length }}&nbsp;</span> 件</p>
                        <img :class="isShowTotal ? 'show' : ''" src='../../../../public/images/cart/up.png'
                             @click='isShowTotal = !isShowTotal' />
                    </div>
                    <!--        <c-components-total />-->
                    <div class='xy-center'>
                        <span>合计：</span>
                        <CMoney :money='countTotal' size='sm'></CMoney>
                    </div>
                    <el-button @click='settleAccount'>结算</el-button>
                </div>
            </div>
        </div>
        <c-modal :context="'是否删除该商品？'" :is-show-cancel='true' :is-show-modal='isShowDel' @confirm='deleteFormCart'
                 @hide='isShowDel = false' />
    </div>
</template>

<script>
    import CMoney from '@components/public/c-money'
    import CInputNumber from '@components/public/c-input-number'
    import CModal from '@components/public/c-modal.vue'

    const maxImgLength = 10
    export default {
        name: 'CGoodListItem',
        props: {
            // 是否显示结算相关信息
            isShowAccount: {
                type: Boolean,
                default: false
            },
            // 数量
            accountNum: {
                type: Number,
                default: 1
            },
            showCheckBox: {
                type: Boolean,
                default: true
            }
        },
        components: {
            CMoney,
            CInputNumber,
            CModal
        },
        data() {
            return {
                checkAll: false,
                checkedGoods: [],
                isIndeterminate: false,
                leftIndex: 0,
                rightIndex: maxImgLength,
                isShowTotal: false, // 是否显示所有所选的
                carts: [],
                totalMoney: 0,
                imgList: [],
                isShowDel: false,
                purchaseList: [],
                delId: ''
            }
        },
        computed: {
            getImgList() {
                return this.imgList.filter((item, index) => {
                    return index >= this.leftIndex && index < this.rightIndex
                })
            },
            getcarts() {
                /* eslint-disable */
                this.carts = this.$store.getters.getCarts
                return this.carts
            },
            // 计算已选商品的总金额、图片列表、购买数量
            countTotal() {
                /* eslint-disable */
                this.totalMoney = 0
                this.imgList = []
                this.purchaseList = []
                this.checkedGoods.forEach(id => {
                    const cart = this.carts.find(item => item.id === id)
                    this.totalMoney += cart.product.price * cart.purchaseNum
                    this.imgList.push(cart.product.image)
                    this.purchaseList.push({
                        id: cart.product.id,
                        purchaseNum: cart.purchaseNum
                    })
                })
                this.totalMoney = parseFloat(this.totalMoney.toFixed(2))
                return this.totalMoney
            }

        },
        methods: {
            handleCheckAllChange(val) {
                this.checkedGoods = val ? this._getGoodsIdList() : []
                this.isIndeterminate = false
            },
            handleCheckedGoodsChange(value) {
                console.log(value)
                let checkedCount = value.length
                this.checkAll = checkedCount === this.carts.length
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.carts.length
            },
            // 加载更多图片
            loadMoreImg(direction) {
                if (this.imgList.length < maxImgLength) {
                    return
                }
                if (direction === 'left' && this.leftIndex > 0) {
                    --this.leftIndex
                    --this.rightIndex
                }
                if (direction === 'right' && this.rightIndex < this.imgList.length) {
                    ++this.rightIndex
                    ++this.leftIndex
                }
            },
            // 删除商品
            deleteFormCart() {
                let old = this.$store.state.Carts
                old.forEach((cur, index) => {
                    if (cur.id === this.delId) {
                        old.splice(index, 1)
                    }
                })
                this.$store.dispatch('setCarts', old)
                this.$bus.$emit('getCarts', true)
            },
            showDelModal(id) {
                this.delId = id
                this.isShowDel = true
            },
            // 监听数量的变化
            onInputChange(num, index) {
                let old = this.$store.state.Carts
                old.forEach((cur) => {
                    if (cur.id === this.carts[index].id) {
                        old[index].purchaseNum = num
                    }
                })
                this.$store.dispatch('setCarts', old)
            },
            //
            settleAccount() {
                if (!this.purchaseList.length) {
                    this.$tips.warn('您还未选中任何商品')
                    return
                }
                this.$router.push({
                    path: 'order',
                    query: {
                        purchaseList: this.purchaseList
                    }
                })
            },
            // 获取商品id列表
            _getGoodsIdList() {
                const temp = []
                this.carts.forEach(item => {
                    temp.push(item.id)
                })
                return temp
            }
        },
        mounted() {

        }
    }
</script>

<style lang='scss'>
.c-good-list-item {
    font-size: 18px;
    font-family: Source Han Sans CN;
    font-weight: 500;
    color: rgba(46, 50, 51, 1);

    .order {
        width: 860px;
        padding: 0 10px;
        margin-top: 10px;
        height: 24px;
        justify-content: space-between;
        background: #DDDDDD;
        font-size: 12px;
        font-family: Source Han Sans CN;
        color: rgba(102, 102, 102, 1);

        .date {
            font-size: 12px;
            color: #333;
            font-weight: 500;
            margin: 0 10px;
        }

        div {
            &:nth-child(2) {
                color: #333 !important;
                margin: 0 10px;
            }
        }
    }

    .el-checkbox {
        width: 25px;
    }

    .el-checkbox__label {
        opacity: 0;
    }

    .el-checkbox__input {
        .el-checkbox__inner {
            width: 25px;
            height: 25px;
            border-radius: 100%;
            border-color: #ccc;
            background: #fff;

            &::after {
                width: 8px;
                box-sizing: content-box;
                content: "";
                border: 2px solid #fff;
                border-left: 0;
                border-top: 0;
                height: 15px;
                left: 7px;
                position: absolute;
                top: 1px;
            }

            &:focus, & :active {
                border-color: #ccc;
            }

            &:hover {
                border-color: #FF7C25 !important;
            }
        }

        .ic-check .el-checkbox__inner {
            background-color: #fff;
            border-color: #FF7C25;
        }
    }

    .el-checkbox__input.is-checked .el-checkbox__inner {
        background-color: #FF7C25;
        border-color: #FF7C25;
    }

    .el-checkbox__input.is-indeterminate .el-checkbox__inner {
        background: #fff;
        border-color: #ccc;

        &:before {
            content: none;
        }

        &:focus, &:active {
            border-color: #ccc;
        }
    }

    .el-checkbox__input.is-checked + .el-checkbox__label {
        color: #FF7C25 !important;
        opacity: 0;
        transition: all .5s;
        -webkit-transition: all .5s;
    }

    .c-row-container {
        border-bottom: 1px solid rgba(235, 235, 235, 1);
    }

    .c-row {
        display: flex;
        align-items: center;
        margin: 10px 0;
        /*width: 1200px;*/
        border-bottom: 0 !important;
        padding: 10px 0;

        .c-del-good {
            width: 24px;
            height: 24px;
            background-image: url("../../../../public/images/cart/del.png");

            &:hover, & :active {
                background-image: url("../../../../public/images/cart/del-active.png");
            }
        }

        img {
            width: 120px;
            height: 120px;
            margin-left: 20px;
        }

        .yx-center img {
            width: 80px;
            height: 30px;
            margin-top: 5px;
        }

        .c-good-name {
            font-size: 16px;
            /*opacity: 1;*/
        }

        .account-num {
            font-size: 16px;
        }
    }
}

.checkout {
    position: fixed;
    bottom: 0;
    z-index: 9999;
}

.selected-all {
    width: 1200px;
    justify-content: space-between !important;
    background: #E5E5E5;

    .c-all-checkbox {
        margin-left: 28px;

        span {
            opacity: 1 !important;
            font-size: 14px;
            font-family: Source Han Sans CN;
            color: rgba(102, 102, 102, 1);
        }
    }

    .selected-right {
        width: 600px;
        display: flex;
        justify-content: space-between;

        p {
            font-size: 14px;
            font-weight: 400;
            color: rgba(102, 102, 102, 1);

            span {
                color: #FF6B67;
                font-size: 16px;
            }
        }

        .select-num {
            img {
                width: 16px;
                height: 16px;
                margin-left: 5px;
                margin-top: 4px;
            }

            .show {
                transform: rotate(180deg);
            }
        }

        .el-button {
            background: #FF4400;
            color: #fff;
            width: 108px;
            height: 52px;
            font-size: 18px;
            border: 0;
            border-radius: 0;

            &:active {
                border: 2px solid #ff4400;
            }
        }
    }
}

.c-total-container {
    background: #494949;

    .arrow-left {
        padding-left: 50px;
        padding-bottom: 10px;
    }

    .arrow-right {
        padding-right: 50px;
        padding-bottom: 10px;
    }

    p {
        font-size: 14px;
        color: #fff;
        margin: {
            top: 5px;
            left: 5px;
        }

        span {
            color: #FF6B67;
            font-size: 16px;
        }
    }

    .total-container {
        justify-content: space-between;
    }

    .img-container {
        max-width: 1000px;
        margin: 0 auto;

        img {
            width: 70px;
            height: 70px;
            margin: {
                right: 20px;
                bottom: 10px;
            }
        }
    }
}
</style>
