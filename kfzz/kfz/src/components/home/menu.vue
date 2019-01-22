<template>
    <div>
        <el-tree :data="data" :props='{label:"menu_name",children:"children"}' @node-click="menuEnter"></el-tree>
    </div>
</template>
<script>
export default {
    name:"vmenu",
    props:["data"],
    methods:{
        menuEnter(opt,node,comp){
            // console.log(a,b,c)
            if(opt.menu_url){
                this.$router.push(opt.menu_url)
            }
        }
    }
}
</script>
