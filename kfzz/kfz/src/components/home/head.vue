<template>
    <div class="head">
        <header>
            <h1>孔夫子旧书网后台管理系统</h1>
            <div>
                <img :src="adminopt.admin_tx"/>
                <span>{{adminopt.admin_name}}</span>
                <span class="el-icon-setting"></span>

            </div>
        </header>
    </div>
</template>
<script>
export default {
    name:"vhead",
    props:["adminopt"]
}
</script>
<style>
    .head{
        height: 80px;
        background: #409EFF
    }
</style>
