<template>
    <div :class="isShowLikeAnimation ? 'add-animation' : ''" :style='setStyle' class='c-tag' @click='likeForBrief'>
        {{ `${detail.brief}(${detail.likeNum})` }}
    </div>
</template>

<script>

    export default {
        name: 'CTag',
        props: {
            productsId: String,
            detail: Object,
            index: Number
        },
        data() {
            return {
                isShowLikeAnimation: false
            }
        },
        computed: {
            setStyle() {
                return {
                    color: this.detail.color || '#ff4400',
                    border: `1px solid ${this.detail.color}`
                }
            }
        },
        methods: {
            likeForBrief() {
            }
        }
    }
</script>

<style lang='scss' scoped>
.c-tag {
    display: inline-block;
    height: 22px;
    padding: 5px 10px;
    border: 1px solid #ff4400;
    text-align: center;
    font-size: 14px;
    color: #ff4400;
    margin: 5px 8px;
    position: relative;
}

.add-animation {

    &:after {
        content: '+1';
        width: 100%;
        display: block;
        position: absolute;
        text-align: center;
        top: -20px;
        margin-left: -10px;
        font-size: 14px;
        font-weight: 300;
        animation: like-animation .7s linear;
        -moz-animation: like-animation .7s linear;
        -webkit-animation: like-animation .7s linear;
        -o-animation: like-animation .7s linear;
    }
}

@keyframes like-animation {
    from {
        font-size: 14px;
        top: -20px;
        opacity: 1;
    }

    to {
        font-size: 20px;
        top: -60px;
        opacity: 0;
    }
}

@-moz-keyframes like-animation /* Firefox */
{
    from {
        font-size: 14px;
        top: -20px;
        opacity: 1;
    }

    to {
        font-size: 20px;
        top: -60px;
        opacity: 0;
    }
}

@-webkit-keyframes like-animation /* Safari 和 Chrome */
{
    from {
        font-size: 14px;
        top: -20px;
        opacity: 1;
    }

    to {
        font-size: 20px;
        top: -60px;
        opacity: 0;
    }
}

@-o-keyframes like-animation /* Opera */
{
    from {
        font-size: 14px;
        top: -20px;
        opacity: 1;
    }

    to {
        font-size: 20px;
        top: -60px;
        opacity: 0;
    }
}

</style>
