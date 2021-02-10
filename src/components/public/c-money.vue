<template>
    <div :class='size' class='money'>
        <span :style='setColor' class='money-icon'>¥</span>
        <span :style='setColor' class='money-text'>{{ money | formatMoney }}</span>
    </div>
</template>

<script>
    export default {
        name: 'CMoney',
        props: {
            money: {
                type: Number,
                default: 0
            },
            size: String,
            color: {
                type: String,
                default: '#DD524D'
            }
        },
        computed: {
            setColor() {
                return {
                    color: this.color
                }
            }
        }
    }
</script>

<style lang='scss' scoped>
.money {
    display: flex;
    align-items: center;
    font-family: Source Han Sans CN;

    span {
        color: #DD524D;
        padding: 0;
        display: block;
    }

    .money-icon {
        font-size: 20px;
        margin-right: 5px;
    }

    .money-text {
        font-size: 30px;
    }
}

.md {
    .money-icon {
        font-size: 18px;
    }

    .money-text {
        font-size: 28px;
    }
}

.sm {
    .money-icon {
        font-size: 16px;
    }

    .money-text {
        font-size: 24px;
    }
}

.xs {
    .money-icon {
        font-size: 14px;
    }

    .money-text {
        font-size: 20px;
    }
}

/*删除线*/

.d-xs {
    span {
        font-size: 20px !important;
        margin-right: 0 !important;
        color: #999999 !important;
        text-decoration: line-through;
    }
}
</style>
