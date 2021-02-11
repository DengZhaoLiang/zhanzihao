<template>
    <div>
        <el-popover
            placement='left'
            trigger='hover'
            width='250'>
            <div class='address-popover-container'>
                <p>{{ address.name || '' }}</p>
                <p>{{ address.detail || '' }}</p>
                <p>{{ address.phone || '' }}</p>
            </div>
            <span slot='reference' class='address-span'>物流信息</span>
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
