<template>
    <div class='c-image-picker'>
        <div class='up-side'>
            <img :src='img ? img : "http://localhost:9527/static/defaultAvatar.png" '>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'CImagePicker',
        data() {
            return {
                selectedIndex: 0
            }
        },
        props: {
            img: {
                type: String
            }
        }
    }
</script>

<style lang='scss' scoped>
    .c-image-picker {

        .up-side {

            img {
                width: 372px;
                height: 372px;
            }
        }

        .down-side {
            display: flex;
            justify-content: space-between;
            margin-top: 10px;

            /*div {*/
            /*width: 62px;*/
            /*height: 62px;*/
            img {
                width: 60px;
                height: 60px;
                border: 1px solid transparent;

                &:hover {
                    border: 1px solid #ff4400;
                }
            }

            /*}*/
        }
    }
</style>
