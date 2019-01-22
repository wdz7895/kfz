<template>
    <div class="loginPage">
        <div class="loginBox flexCenter">
            <h2>管理员登陆</h2>
            <div class="flexBox w350">
                <el-input v-model="admin" placeholder="请输入帐号" :clearable="true"></el-input>
                <el-input v-model="pass" placeholder="请输入密码" :clearable="true"></el-input>
                <el-button type="primary" @click="login">提交</el-button>
            </div>
        </div>
        
    </div>
</template>
<script>
export default {
    name:"login",
    data(){
        return{
            admin:"",
            pass:""
        }
    },
    methods:{
        login(){
            this.$http.login({
                admin_name:this.admin,
                admin_pwd:this.pass
            }).then(res=>{
                let data = res.data;
                localStorage.admin_name = data.admin_name;
                localStorage.admin_ID = data.admin_ID;
                localStorage.admin_jsID = data.admin_jsID;
                localStorage.admin_jsName = data.admin_jsName;
                localStorage.admin_tokenID = data.admin_tokenID;
                this.$router.push({
                    path:"/"
                })
            })
        }
    }
}
</script>
<style>
    .loginPage{
        width: 100%;
        height: 100%;
        position: relative;
    }
    .loginBox{
        width: 500px;
        height: 350px;
        box-shadow: 2px 2px 5px black;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        margin: auto;
    }
    .loginBox h2{
        width: 100%;
        height: 80px;
        background: #409EFF;
        padding: 10px 0;
        color: white;
        line-height: 80px;
        text-align: center;
    }
    .w350{
        width: 350px;
    }
    .flexBox{
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        justify-content: center
    }
    .flexCenter{
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }
</style>

