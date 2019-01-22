const express = require("express")
const router = express.Router()
const DB = require("../module/db.js")
const db = new DB("kfz")
const jwt = require("../module/jwt.js")
//admin 后台管理路由

router.use((req,res,next)=>{
    if(req.url=="/login"){
        next()
    }else{
        let token = req.headers.authorization;
        let data = null;
        
        if(req.method == "GET"){
            data = req.query;
            
        }else{
            data = req.body;
            
        }
        
        jwt.setToken(token,(err,data2)=>{
            if(err){
                res.status(401)
                res.send()
            }else{
                if(data.admin_ID == data2.admin_ID && data.admin_jsID == data2.admin_jsID){
                    next()
                }else{
                    res.status(401)
                    res.send()
                }
                
            }
        })
    }
})

//登录接口
router.post("/login",(req,res)=>{
    let admin_name = req.body.admin_name;
    let admin_pwd = req.body.admin_pwd;
    db.find("adminList",{query:{admin_name,admin_pwd}},(err,data)=>{
        if(data.length>=1){
            //用户存在
            let user = data[0];
            db.insertOne("adminLog",{
                admin_ID:user._id,
                doTime:new Date().getTime(),
                doSth:"登录",
            },(err,result)=>{
                if(err) throw err
                
                res.send({
                    "admin_ID":user._id,
                    "admin_name":user.admin_name,
                    "admin_jsID":user.admin_jsID,
                    "admin_jsName":user.admin_jsName,
                    admin_tokenID:jwt.getToken({
                        admin_ID:user._id,
                        admin_jsID:user.admin_jsID
                    },"7d")
                })
            })
        }else{
            //用户不存在
        }
    })
})


//获取用户详情
router.get("/adminOpt",(req,res)=>{
    let admin_ID = req.query.admin_ID;
    db.find("adminOpt",{query:{admin_ID}},(err,data)=>{
        if(err) throw err;
        res.send(data)
    })
})

//获取管理目录
router.get("/adminMenu",(req,res)=>{
    let menu_jsID = req.query.admin_jsID
    db.find("admin_menu",{query:{menu_jsID}},(err,data)=>{
        res.send(data)
    })
})

//获取管理员列表
router.get("/adminList",(req,res)=>{
    let skip = req.query.skip*1;
    let limit = req.query.limit*1
    db.count("adminOpt",{},(err,count)=>{
        let num = count
        db.find("adminOpt",{skip,limit},(err,data)=>{
            if(err) throw err
            res.send({
                count:num,
                data
            })
        })
    })
})

//读取角色列表接口
router.get("/jsList",(req,res)=>{
    if(req.query.jsName){
        db.find("admin_jsList",{query:{js_name:req.query.jsName}},(err,data)=>{
            res.send(data)
        })
    }else{
        db.find("admin_jsList",{},(err,data)=>{
            res.send(data)
        })
    }
})
//验证新角色名称是否重复
router.get("/jsNameRepeat",(req,res)=>{
    let jsName = req.query.jsName
    db.count("admin_jsList",{jsName},(err,count)=>{
        if(err) throw err ;
        if(count>0){
            res.send({
                status:"-1",
                statusText:"角色已存在"
            })
        }else{
            res.send({
                status:"1",
                statusText:"ok"
            })
        }

    })
})

//修改角色名称接口
router.post("/updateJsName",(req,res)=>{
    let admin_ID = req.body.admin_ID;
    let admin_pwd = req.body.admin_pwd
    let jsID = req.body.id
    let jsName = req.body.jsName
    console.log(req.body)
    /*
    *通过用户提供的用户id，及密码 验证身份的合法性
        合法 则继续    不合法 返回401；
        合法 读取用户的权限id 判断用户是否具备改权限
        如果具备 继续 不具备 返回403  ==》403 回退首页
        具备 修改 记录至管理员日志 
        返回操作成功
    */
    db.findById("adminList",admin_ID,(err,data)=>{
        if(err) throw err
        //匹配密码是否正确
        if(data.admin_pwd==admin_pwd){
            let admin_jsID = data.admin_jsID
            db.find("admin_menu",{query:{menu_jsID:admin_jsID}},(err,data2)=>{
                let obj = data2.find((item,index)=>{
                    if(item.menu_name=="权限管理"){
                        return true
                    }else{
                        false
                    }
                })
                //判断是否具备权限
                if(obj){
                    db.updateById("admin_jsList",jsID,{js_name:jsName},(err,data3)=>{
                        db.updateMany("adminList",{admin_jsID:jsID},{admin_jsName:jsName},(err,data5)=>{
                            db.updateMany("adminOpt",{admin_jsID:jsID},{admin_jsName:jsName},(err,data6)=>{
                                db.insertOne("adminLog",{
                                    admin_ID:admin_ID,
                                    doTime:new Date().getTime(),
                                    doSth:"修改了"+jsName+"名称"
                                },(err,data4)=>{
                                    res.send("ok")
                                })
                            })
                        })
                    })
                }else{
                    res.status(403)
                    res.send( )
                }
            })    
        }else{
            res.status(401)
        }
    })
})



module.exports = router; 