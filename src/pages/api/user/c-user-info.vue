<template>
    <div class='c-user-info'>
        <div class='yx-center'>
            <img @click='edit' src='../../../../public/images/public/edit.png'>
            <img :src='getUserInfo.avatar' v-if='getUserInfo'>
            <span v-if='getUserInfo'>{{ getTimeStr() }}</span>
            <span class='nick-name'>{{ getUserInfo.name }}</span>
        </div>
        <c-edit-info :is-show='isEdit' :user-info='getUserInfo' @hide='isEdit = false' v-if='getUserInfo' />
    </div>
</template>

<script>
    import CEditInfo from './c-edit-info'

    export default {
        name: 'CUserInfo',
        props: ['selectedTab', 'tabList'],
        components: {
            CEditInfo
        },
        computed: {
            getUserInfo() {
                return this.$store.getters.getUserInfo
            }
        },
        data() {
            return {
                isEdit: false,
                isShow: true
            }
        },
        methods: {
            changeTab(index) {
                this.$emit('changeTab', index)
            },
            edit() {
                console.log('开始编辑')
                this.isEdit = true
            },
            getTimeStr() {
                const hour = new Date().getHours()
                if (hour >= 0 && hour < 6) {
                    return '凌晨好'
                } else if (hour >= 6 && hour < 12) {
                    return '上午好'
                } else if (hour >= 12 && hour < 18) {
                    return '下午好'
                } else {
                    return '晚上好'
                }
            }
        }
    }
</script>

<style lang='scss' scoped>
    .c-user-info {
        width: 235px;
        height: 350px;
        background: #fff;

        div {
            color: #666;
            font-size: 16px;

            &:nth-child(1) {
                width: 195px;
                padding: 10px;
                border-bottom: 2px solid #f8f8f8;
                margin: 0 auto;

                img {
                    &:nth-child(1) {
                        width: 18px;
                        height: 18px;
                        margin: 8px -5px 0 auto;
                        /*margin-left: auto;*/
                    }

                    &:nth-child(2) {
                        width: 76px;
                        height: 76px;
                        margin: 0 auto;
                        border-radius: 100%;
                    }
                }

                span {
                    margin-top: 8px;
                }
            }

            &:nth-child(2) {
                margin-top: 20px;

                span {
                    line-height: 28px;

                    &:hover {
                        color: #FF7C25;
                    }
                }

                .selected {
                    font-size: 18px;
                    font-weight: 500;
                    color: #FF7C25;
                }
            }
        }

        .nick-name {
            /*font-family: DFPHaiBaoW12-GB;*/
            font-size: 16px;
            font-weight: 200;
            color: #ff4400;
        }
    }

</style>
