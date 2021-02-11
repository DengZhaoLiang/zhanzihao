<template>
    <div class='my'>
        <c-head></c-head>
        <div class='container'>
            <c-user-info :selected-tab='selectedTab' :tab-list='tabList' />
            <c-tab :selected-tab='selectedTab' :tab-list='tabList' />
        </div>
        <c-foot></c-foot>
    </div>
</template>

<script>
    import CHead from '@components/public/c-head'
    import CFoot from '@components/public/c-foot'
    import CUserInfo from './c-user-info'
    import CTab from './c-tab'

    export default {
        name: 'my',
        components: {
            CHead,
            CFoot,
            CUserInfo,
            CTab
        },
        data() {
            return {
                selectedTab: 0,
                tabList: [
                    '我的订单',
                    '收货地址'
                ]
            }
        },
        methods: {},
        mounted() {
            this.$bus.$on('changeTab', value => {
                console.log(value)
                this.selectedTab = value
            })
        }

    }
</script>

<style lang='scss' scoped>
.my {
    width: 100%;
    background: #f2f2f2;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .bread {
        width: 100%;
        background: #F2F2F2;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .container {
        align-items: flex-start;
        margin: 10px 0;

        .c-tab {
            margin-left: 15px;
        }
    }
}
</style>
