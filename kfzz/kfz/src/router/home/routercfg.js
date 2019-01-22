import userList from "@/view/home/userList"
import vipList from "@/view/home/vipList"
import shopList from "@/view/home/shopList"
import adminList from "@/view/home/adminList"
import typeList from "@/view/home/typeList"
import logSearch from "@/view/home/logSearch"
import userPower from "@/view/home/userPower"
import adminPower from "@/view/home/adminPower"



export default {
    routes:[{
        path:"/userList",
        name:"userList",
        meta:{isLogin:true},
        component:userList
    },{
        path:"/vipList",
        name:"vipList",
        meta:{isLogin:true},
        component:vipList
    },{
        path:"/shopList",
        name:"shopList",
        meta:{isLogin:true},
        component:shopList
    },{
        path:"/adminList",
        name:"adminList",
        meta:{isLogin:true},
        component:adminList
    },{
        path:"/typeList",
        name:"typeList",
        meta:{isLogin:true},
        component:typeList
    },{
        path:"/logSearch",
        name:"logSearch",
        meta:{isLogin:true},
        component:logSearch
    },{
        path:"/userPower",
        name:"userPower",
        meta:{isLogin:true},
        component:userPower
    },{
        path:"/adminPower",
        name:"adminPower",
        meta:{isLogin:true},
        component:adminPower
    }
    ]
}