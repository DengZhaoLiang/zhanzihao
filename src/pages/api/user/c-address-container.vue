<template>
    <div class='address-container'>
        <c-address v-for='(item, index) in addressList' :key='index' :address='item' />
        <c-new-address />
    </div>
</template>

<script>
    import CAddress from '@components/public/c-address'
    import CNewAddress from '../order/c-new-address'
    import request from '@utils/request'
    import dataStore from '@utils/dataStore'

    export default {
        name: 'CAddressContainer',
        components: {
            CAddress,
            CNewAddress
        },
        data() {
            return {
                addressList: [],
                userId: ''
            }
        },
        methods: {
            fetchAddressList() {
                if (this.userId === '' || typeof this.userId === 'undefined') {
                    this.$tips.error('请先登录后再试')
                    return
                }
                request.get(`/api/address/user/${this.userId}`)
                    .then(res => {
                        if (res.status === 200) {
                            this.addressList = res.data
                        } else {
                            this.$message.error(res.message)
                        }
                    })
            }
        },
        mounted() {
            this.userId = dataStore.userInfo.id
            this.fetchAddressList()
            this.$bus.$on('updateAddressList', () => {
                this.fetchAddressList()
            })
        }
    }
</script>

<style lang='scss' scoped>

.address-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 600px;
    margin: 0 auto;
}
</style>
