<template>
    <div :style='countImgHeight'>
        <el-carousel :height='imgHeight'>
            <el-carousel-item :key='item' v-for='item in 3'>
                <el-image :src='require(`./../../../public/images/banner/banner0${item}.jpg`)'
                          @load='loadedImg'
                          fit='fill' ref='imgHeight'></el-image>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
    export default {
        name: 'c-banner',
        data() {
            return {
                imgHeight: '440px'
            }
        },
        computed: {
            countImgHeight() {
                return {
                    height: this.imgHeight
                }
            }
        },
        mounted() {
            window.onresize = () => {
                this.imgHeight = this.$refs.imgHeight[0].$el.clientHeight + 'px'
                // this.countImgHeight()
            }
            // this.countImgHeight()
        },
        methods: {
            loadedImg() {
                this.imgHeight = this.$refs.imgHeight[0].$el.clientHeight + 'px'
            }
        }
    }
</script>

<style lang='scss'>

    .el-carousel ul li .el-carousel__button {
        width: 3.375rem;
        height: 0.25rem;
        background: #FF7C25;
        border-radius: 0.09375rem;
    }

</style>
