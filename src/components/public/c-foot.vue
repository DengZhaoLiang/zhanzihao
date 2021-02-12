<template>
    <div class='c-foot xy-center'>
        <div class='contact-icon'>
            <el-tooltip class='item' content='' effect='dark' placement='top-start'>
                <el-button class='item-icon icon-1'></el-button>
            </el-tooltip>
            <el-tooltip class='item' content='' effect='dark' placement='top-start'>
                <el-button class='item-icon icon-2'></el-button>
            </el-tooltip>
            <el-tooltip class='item' content='' effect='dark' placement='top-start'>
                <el-button class='item-icon icon-3'></el-button>
            </el-tooltip>
        </div>
        <div class='detail' style='margin-top: 20px'>
            <span>Copyright© 2021 Cxm. All Rights Reserved. 詹梓浩 版权所有</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'CFoot'
    }
</script>

<style lang='scss' scoped>

    .c-foot {
        width: 100%;
        background: #fff;
        flex-direction: column;
        padding: 18px 0;

        .contact-icon {
            .item-icon {
                width: 31px;
                height: 31px;
                border: none;
                outline: none;
                border-radius: 50%;
                margin: 0 10px;
            }

            .icon-1 {
                background: url("./../../../public/images/public/github1.png") center no-repeat;
            }

            .icon-2 {
                background: url("./../../../public/images/public/wx.png") center no-repeat;
            }

            .icon-3 {
                background: url("./../../../public/images/public/qq.png") center no-repeat;
            }
        }

        .qr-code {

            padding: {
                top: 30px;
                bottom: 26px;
            };

            .xy-center {
                flex-direction: column;
                padding: 0 23px;

                img {
                    width: 75px;
                    height: 75px;
                }

                span {
                    margin-top: 10px;
                }
            }

        }

        .detail {
            text-align: center;

            span {
                display: block;
                font-family: Source Han Sans CN;
                color: rgba(102, 102, 102, 1);
                font-size: 18px;
                margin: {
                    bottom: 15px;
                };
            }

            /*span:nth-child(1) {*/
            /*  font-size: 22px;*/
            /*  font-weight: bold;*/
            /*  color:rgba(51,51,51,1);*/
            /*  margin: {*/
            /*    top: 26px;*/
            /*    bottom: 22px;*/
            /*  }*/
            /*}*/

            span:nth-child(5), span:nth-child(6) {
                color: rgba(153, 153, 153, 1);
            }

            span:nth-child(5) {
                margin-top: 29px;
            }

        }
    }

</style>
