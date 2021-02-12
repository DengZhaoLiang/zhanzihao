<template>
    <div class='c-like-pro'>
        <div @click="like('LIKE')">
            <i class='iconfont icon-zan-up-0' v-if="likeStatus === 'UNSELECTED' || likeStatus === 'UNLIKE'"></i>
            <img src='../../../../public/images/detail/zan-up-1.svg' v-else-if="likeStatus === 'LIKE'">
            <span>{{ this.tempLikeNum }}</span>
        </div>
        <div @click="like('UNLIKE')">
            <i class='iconfont icon-zan-down-0' v-if="likeStatus === 'UNSELECTED' || likeStatus === 'LIKE'"></i>
            <img src='../../../../public/images/detail/zan-down-1.svg' v-else-if="likeStatus === 'UNLIKE'">
            <span>{{ this.tempUnLikeNum }}</span>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'CLikePro',
        data() {
            return {
                likeStatus: 'UNSELECTED', // 点赞的状态，UNSELECTED未选中，LIKE给力，UNLIKE，拉到
                tempLikeNum: 0,
                tempUnLikeNum: 0,
                tempCommentLikeList: []
            }
        },
        props: {
            likeNum: {
                type: Number,
                default: 0
            },
            unLikeNum: {
                type: Number,
                default: 0
            },
            productsId: String,
            commentId: String,
            commentListId: String,
            commentIndex: Number,
            commentListIndex: Number,
            commentLikeList: Array
        },
        watch: {
            likeNum(val) {
                this.tempLikeNum = val
            },
            unLikeNum(val) {
                this.tempUnLikeNum = val
            }
        },
        mounted() {
            this.tempLikeNum = this.likeNum
            this.tempUnLikeNum = this.unLikeNum
            this.tempCommentLikeList = this.commentLikeList
        },
        methods: {}
    }
</script>

<style lang='scss' scoped>
    .c-like-pro {
        display: flex;
        align-items: center;
        justify-content: space-around;
        /*border: 1px solid #e1e1e1;*/
        width: 120px;
        margin-left: auto;
        padding-bottom: 5px;
        border-radius: 20px;

        div {
            i {
                display: inline-block;
                width: 20px;
                height: 20px;
                font-size: 20px;
                color: #ff4400;
            }

            img {
                width: 20px;
                height: 20px;
                animation: rotate45 .6s linear;
            }

            span {
                color: #333;
                font-size: 14px;
                margin-left: 2px;
            }

            &:nth-child(2) {
                display: flex;
                margin-left: 10px;

                i, img {
                    display: inline-block;
                    padding-top: 10px;
                }

                img {
                    animation: rotate-45 .6s linear
                }

                span {
                    display: inline-block;
                    margin-top: 10px;
                }
            }
        }
    }

    @keyframes rotate45 {
        0% {
            transform: rotate(0);
        }
        50% {
            transform: rotate(-45deg);
        }
        100% {
            transform: rotate(0);
        }
    }

    @keyframes rotate-45 {
        0% {
            transform: rotate(0);
        }
        50% {
            transform: rotate(45deg);
        }
        100% {
            transform: rotate(0);
        }
    }
</style>
