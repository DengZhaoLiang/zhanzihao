<template>
    <div class='c-card-total'>
        <el-popover
            offset='300'
            placement='top'
            trigger='manual'
            width='1200'>
            <div class='c-total-container'>
                <p>普通商品<span>1</span>件</p>
                <div class='total-img-container xy-center'>
                    <img src='../../../../public/images/cat/cat_01.png' />
                    <img src='../../../../public/images/cat/cat_02.png' />
                </div>
            </div>
        </el-popover>
    </div>
</template>

<script>
    export default {
        name: 'CardTotal',
        data() {
            return {}
        }
    }
</script>

<style lang='scss'>

    .c-total-container {
        background: #494949;

        p {
            font-size: 14px;
            font-weight: 400;
            color: rgba(102, 102, 102, 1);

            span {
                color: #FF6B67;
                font-size: 16px;
            }

        }

        img {
            width: 50px;
            height: 50px;
        }

    }

</style>
