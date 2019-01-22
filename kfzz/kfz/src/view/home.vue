<template>
    <div class="home">
        <div class="content">
            <v-head :adminopt="adminopt"></v-head>
            <section>
                <div class="leftMenu"> 
                    <v-menu :data="menuTree" :props='{label:"menu_name",children:"children"}'></v-menu>
                </div>
                <div class="rightView">
                    <router-view></router-view>
                </div>
            </section>
        </div>
    </div>
</template>
<script>
    import vHead from "@/components/home/head.vue"
    import vMenu from "@/components/home/menu.vue"
    export default {
        name:"home",
        data(){
            return {
                adminopt:{
                    tx:"",
                    admin_name:localStorage.admin_name
                },
                menuTree:[]
            }
        },
        components:{
            vHead,
            vMenu
        },
        mounted(){
            Promise.all([this.$http.getAdminOpt({
                admin_ID:localStorage.admin_ID,
                admin_jsID:localStorage.admin_jsID
            }),this.$http.getMenu({
                admin_ID:localStorage.admin_ID,
                admin_jsID:localStorage.admin_jsID
            })]).then(res=>{
                this.adminopt = res[0].data[0]
                this.menuTree = res[1].data
            })
        }
    }
</script>
<style>
    .home{
        width: 100%;
        height: 100%;
    }
    .content{
        min-width: 1200px;
        width: 90%;
        height: 100%;
        margin: auto;
        position: relative;
        
    }
    .leftMenu{
        width: 200px;
        position: absolute;
        top: 80px;
        bottom: 0;
        left: 0;
    }
    .rightView{
        position: absolute;
        top: 80px;
        bottom: 0;
        left: 200px;
        right: 0;
    }
</style>
