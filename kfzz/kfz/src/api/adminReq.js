import axios from "axios"
//请求拦截器
axios.interceptors.request.use((config)=>{
    let params = new URLSearchParams();
    if(config.method == "post"){
        if(config.data){
            for(var k in config.data){
                params.append(k,config.data[k])
            }
            config.data = params
        }
        config.headers = {
            "content-type":"application/x-www-form-urlencoded"
        }
    }
    if(config.url.indexOf("/login")<0){
        config.headers.authorization = localStorage.admin_tokenID;
        if(config.method == "get"){
            //判断是否有发送数据    
            if(config.params){
                config.params.admin_ID = localStorage.admin_ID;
                config.params.admin_jsID = localStorage.admin_jsID
            }else{
                config.params = {
                    admin_ID:localStorage.admin_ID,
                    admin_jsID:localStorage.admin_jsID
                }
            }
        }else{
            params.append("admin_ID",localStorage.admin_ID)
            params.append("admin_jsID",localStorage.admin_jsID)
            config.data = params
        }
    }
    
    return config
})

axios.interceptors.response.use((data)=>{
    if(data.status == 401){
        window.location.href = "http://localhost:8080/#/login"
        throw new Error("身份验证有误")
    }else{
        return data
    }
    
})

export default{
    //登录接口
    login(data){
        return axios({
            method:"post",
            url:"/admin/login",
            data
        })
    },
    //获取管理员详情
    getAdminOpt(data){
        return axios({
            method:"get",
            url:"/admin/adminOpt",
            params:data
        }) 
    },

    //获取菜单请求
    getMenu(data){
        return axios({
            method:"get",
            url:"/admin/adminMenu",
            params:data
        }) 
    },
    //获取管理员列表
    getAdminList(obj){
        return axios({
            method:"get",
            url:"/admin/adminList",
            params:{
                limit:obj.limit,
                skip:obj.skip
            }
        }) 
    },
    //获取角色列表请求
    getAdminJs(obj){
        if(obj){
            return axios({
                method:"get",
                url:"/admin/jsList",
                params:obj
            })
        }else{
            return axios({
                method:"get",
                url:"/admin/jsList",
            }) 
        }
    },
    //去验证角色是否重复
    jsNameRepeat(obj){
        return axios({
            method:"get",
            url:"/admin/jsNameRepeat",
            params:obj
        })
    },
    //修改角色名称
    updateJsName(obj){
        return axios({
            method:"post",
            url:"/admin/updateJsName",
            data:obj
        })
    }
}  