<template>
    <div>
        <el-popover
            placement='left'
            trigger='hover'
            width='250'>
            <div class='address-popover-container'>
                <div>
                    <span style='font-weight: bold'>{{ address.name || '' }}</span>
                </div>

                <div>
                    <img src='../../../../public/images/order/location.svg' />
                    <span>{{ address.detail | formatString(14) }}</span>
                </div>
                <div>
                    <img src='../../../../public/images/order/phone.svg' />
                    <span>{{ address.phone || '' }}</span>
                </div>
            </div>
            <span class='address-span' slot='reference'>物流信息</span>
        </el-popover>
    </div>
</template>

<script>
    export default {
        name: 'CAddressPopover',
        props: ['address']
    }
</script>

<style lang='scss' scoped>
    .address-popover-container {
        padding-left: 5px;

        p {
            margin: 10px !important;
            font-size: 14px !important;
            color: #333;

            &:nth-child(1) {
                font-weight: bold;
            }
        }
    }

    .address-span {
        &:hover {
            color: #ff4400;
            padding-bottom: 2px;
            border-bottom: 1px solid #ff4400;
        }
    }
</style>
