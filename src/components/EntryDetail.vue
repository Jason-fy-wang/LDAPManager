<template>
    <div>
        <h2>Detail</h2>

        <h3>{{ route.params.dn }}</h3>
    </div>
</template>
<script setup name="Detail">

import { useRoute } from 'vue-router'
const route = useRoute()

</script>
<style lang="less">
    
</style>